/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authGwoupa00fb6f3UserPoolId = process.env.AUTH_GWOUPA00FB6F3_USERPOOLID

Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const uuidv4 = require('uuid/v4');


AWS.config.update({region: process.env.TABLE_REGION});

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "survey";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false;//true;
const partitionKeyName = "surveyId";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/surveys";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

const getUserId = (authProvider) => {
  const parts = authProvider.split(':');
  return parts[parts.length - 1];
};


app.get('/surveys', function (req, res) {
  var condition = {};
  // req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const userId = getUserId(req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider);

  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: [userId]
  };

  let params = {
    TableName: tableName,
    KeyConditions: condition
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json({data: data.Items});
    }
  });
});

// Get by Id
app.get('/surveys/*', function (req, res) {
  res.json({success: 'get call succeed!', url: req.url});
});

// create
app.post('/surveys', function (req, res) {
  const userId = getUserId(req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider);
  const {title, minGroupSize, maxGroupSize, preferredGroupSize, pin} = req.body;

  let params = {
    TableName: tableName,
    Item: {
      title,
      minGroupSize,
      maxGroupSize,
      preferredGroupSize,
      pin,
      responses: [],
      questions: [],
      status: 'DRAFT',
      ownerId: userId,
      surveyId: uuidv4()
    }
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json({data});
    }
  });
});

// update
app.put('/surveys', function (req, res) {
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

// add answers
app.put('/surveys/answers', function (req, res) {
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});


// delete by Id
app.delete('/survey', function (req, res) {
  var condition = {};
  const userId = getUserId(req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider);

  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: [userId]
  };

  condition['surveyId'] = {
    ComparisonOperator: 'EQ',
    AttributeValueList: [{"S": req.query.surveyId}]
  };

  let params = {
    TableName: tableName,
    KeyConditions: condition
  };

  // dynamodb.delete(params, (err, data) => {
  //   if (err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Could not load items: ' + err});
  //   } else {
  //     res.json({data: data.Items});
  //   }
  // });
  res.json({data: []});
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
