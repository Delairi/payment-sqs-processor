const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const crypto = require('crypto');

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

const client = DynamoDBDocumentClient.from(new DynamoDB({}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});



app.post('/orders', async function (req, res) {
  try {

    const id = crypto.randomUUID();
    const params = {
      TableName: "Orders-dev",
      Item: {
        id,
        orderId: crypto.randomUUID(),
        card: req.body.card,
        name: req.body.name,
        status: 'PROCCESSING'
      }
    };

    const data = await client.send(new PutCommand(params));
    res.json({ id });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: 'Could not retrieve orders' });
  }
});

app.get('/orders', async function (req, res) {
  try {
    const params = {
      TableName: "Orders-dev"
    };

    const data = await client.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: 'Could not retrieve orders' });
  }
});


app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
