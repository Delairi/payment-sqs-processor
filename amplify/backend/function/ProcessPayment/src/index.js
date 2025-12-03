
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const crypto = require('crypto');
const client = new DynamoDBClient({});

exports.handler = async (event) => {
    try {

        const getPaymentStatus = new GetItemCommand({
            TableName: "Status-dev",
            Key: {
                id: { S: 'paymentStatus' }
            }
        });
        const statusData = await client.send(getPaymentStatus);
        console.log("Status Data:", statusData);
        const paymentStatus = statusData.Item ? statusData.Item.status.BOOL : false;
        if (!paymentStatus) {
            throw new Error("Force failure payment status");
        }

        for (const record of event.Records) {
            const body = JSON.parse(record.body);
            if (!body.card || !body.name) throw new Error("Invalid body format");
            const command = new PutItemCommand({
                TableName: "Orders-dev",
                Item: {
                    id: { S: crypto.randomUUID() },
                    card: { S: body.card },
                    name: { S: body.name },
                    orderId: { S: crypto.randomUUID() },
                }
            });
            const response = await client.send(command);
            return {
                response
            };
        }
    } catch (err) {
        console.log("Error processing SQS message:", err);
        throw err;
    }
};