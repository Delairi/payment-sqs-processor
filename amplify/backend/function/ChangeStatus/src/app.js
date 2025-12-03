const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "Status";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}
const path = "/status";

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get(path, async function(req, res) {

  const putItemParams = {
    TableName: tableName,
    Key: {
      id: 'paymentStatus'
    }
  }
  
  try {
    const data = await ddbDocClient.send(new GetCommand(putItemParams));
    res.json( data.Item );
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

app.post(path, async function(req, res) {

  const putItemParams = {
    TableName: tableName,
    Item: {...req.body, id: 'paymentStatus' },
  }
  
  try {
    const data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json( data );
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});


app.listen(3000, function() {
  console.log("App started")
});

module.exports = app
