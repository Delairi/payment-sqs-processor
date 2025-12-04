import * as cdk from 'aws-cdk-lib';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class cdkStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });

    const getProjectInfo = AmplifyHelpers.getProjectInfo()
    const tableOrders = `Orders-${getProjectInfo.envName}`;
    const tableStatus = `Status-${getProjectInfo.envName}`;

    const myQueue = new sqs.Queue(this, 'ProcessPaymentQueue', {
      queueName: 'ProcessPaymentQueue',
      encryption: sqs.QueueEncryption.UNENCRYPTED
    });

    const processPaymentLambda = new lambda.Function(this, 'ProcessPaymentHandler', {
      functionName: 'ProcessPaymentHandler',
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
      const { DynamoDBClient, UpdateItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
      const crypto = require('crypto');
      const client = new DynamoDBClient({});

      exports.handler = async (event) => {
              try {
                const getPaymentStatus = new GetItemCommand({
                  TableName: "${tableStatus}",
                  Key: {
                      id: { S: 'paymentStatus' }
                  }
              });
              const statusData = await client.send(getPaymentStatus);
              const paymentStatus = statusData.Item ? statusData.Item.status.BOOL : false;
              if (!paymentStatus) {
                  throw new Error("Force failure payment status");
              } 
              for (const record of event.Records) {
                  const body = JSON.parse(record.body);
                  if (!body.id) throw new Error("Invalid body format");
                  const command = new UpdateItemCommand({
                      TableName: "${tableOrders}",
                      Key: {
                        id: { S: body.id }
                      },
                      UpdateExpression: "SET #st = :newStatus",
                      ExpressionAttributeNames: {
                        "#st": "status"
                      },
                      ExpressionAttributeValues: {
                        ":newStatus": { S: "PAYED" }
                      },
                      ReturnValues: "ALL_NEW"
                  });
                  const response = await client.send(command);
                  return {
                      response,
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
                      },
                  };
              }
          } catch (err) {
              console.log("Error processing SQS message:", err);
              throw err;
          }
      };
  `),
    });

    processPaymentLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ],
        resources: [
          `arn:aws:dynamodb:${this.region}:${this.account}:table/${tableOrders}`,
          `arn:aws:dynamodb:${this.region}:${this.account}:table/${tableStatus}`
        ],
      })
    );

    new lambda.EventSourceMapping(this, 'SqsEventSourceMapping', {
      eventSourceArn: myQueue.queueArn,
      target: processPaymentLambda,
      enabled: true,
    });

    myQueue.grantConsumeMessages(processPaymentLambda);

    const myApi = new apigateway.RestApi(this, 'ProcessPaymenAPI', {
      restApiName: 'ProcessPaymentAPI',
      deploy: false,
      cloudWatchRole: false,
    });

    const apiToSqsRole = new iam.Role(this, 'ApiToSqsRole', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });

    myQueue.grantSendMessages(apiToSqsRole);

    const sqsIntegration = new apigateway.AwsIntegration({
      service: 'sqs',
      path: `${this.account}/${myQueue.queueName}`,
      integrationHttpMethod: 'POST',
      options: {
        credentialsRole: apiToSqsRole,
        requestParameters: {
          'integration.request.header.Content-Type': "'application/x-www-form-urlencoded'",
        },
        requestTemplates: {
          'application/json': 'Action=SendMessage&MessageBody=$input.body',
        },
        integrationResponses: [{ statusCode: '200' }],
      },
    });

    const paymentResource = myApi.root.addResource('payment');

    paymentResource.addMethod('POST', sqsIntegration, {
      methodResponses: [{ statusCode: '200' }],
    });



  }
}