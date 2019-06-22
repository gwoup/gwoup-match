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
var authGwoupba07346bUserPoolId = process.env.AUTH_GWOUPBA07346B_USERPOOLID
var storageSurveyName = process.env.STORAGE_SURVEY_NAME
var storageSurveyArn = process.env.STORAGE_SURVEY_ARN

Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
// var utils = require('./utils');
const uuidv4 = require('uuid/v4');


AWS.config.update({region: process.env.TABLE_REGION || "us-west-2"});
const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "survey";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "surveyId";
const partitionKeyType = "S";
const sortKeyName = "ownerId";
const sortKeyType = "S";
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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, x-amz-date, x-amz-security-token");
  next()
});

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';

const getRandomKey = (length) => {
  let result = [];

  const charactersLength = CHARSET.length;
  for (let i = 0; i < length; i++) {
    result.push(CHARSET.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return result.join('');
};

const getUserId = (req) => {
  if (userIdPresent) {
    const authProvider = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider;
    const parts = authProvider.split(':');
    return parts[parts.length - 1];
  }

  return demoUserId || "";
};

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

app.get('/surveys', function (req, res) {
  const currentUserId = getUserId(req);

  let params = {
    TableName: tableName,
    IndexName: "ownerId",
    KeyConditionExpression: "ownerId = :ownerId",
    ExpressionAttributeValues: {
      ":ownerId": currentUserId,
    },
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
app.get('/surveys/:surveyId', function (req, res) {
  const currentUserId = getUserId(req);
  const {surveyId} = req.params;

  let params = {
    TableName: tableName,
    Key: {
      surveyId,
      ownerId: currentUserId,
    }
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not find item: ' + err});
    } else {
      res.json({data});
    }
  });
});

// create
app.post('/surveys', function (req, res) {
  const userId = getUserId(req);
  const {title, questions, minGroupSize, maxGroupSize, preferredGroupSize} = req.body;

  let params = {
    TableName: tableName,
    Item: {
      title,
      minGroupSize,
      maxGroupSize,
      preferredGroupSize,
      pin: getRandomKey(6),
      responses: [],
      questions,
      status: 'DRAFT',
      ownerId: userId,
      surveyId: uuidv4()
    }
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not create item: ' + err});
    } else {
      res.json({data});
    }
  });
});

// update
app.put('/surveys', function (req, res) {
  const currentUserId = getUserId(req);
  const {title, surveyId, minGroupSize, maxGroupSize, preferredGroupSize, questions} = req.body;

  let params = {
    TableName: tableName,
    Key: {
      ownerId: currentUserId,
      surveyId
    },
    UpdateExpression: "set title = :title, responses = :responses, minGroupSize = :minGroupSize, maxGroupSize = :maxGroupSize, preferredGroupSize = :preferredGroupSize, questions = :questions",
    ExpressionAttributeValues: {
      ":title": title,
      ":minGroupSize": minGroupSize,
      ":maxGroupSize": maxGroupSize,
      ":preferredGroupSize": preferredGroupSize,
      ":questions": questions,
      ":responses": []
    }
  };

  dynamodb.update(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not update item: ' + err});
    } else {
      res.json({data});
    }
  });
});

// publish
app.put('/surveys/publish', function (req, res) {
  const currentUserId = getUserId(req);
  const {surveyId, publish} = req.body;
  const status = publish ? 'PUBLISHED' : 'DRAFT';

  let params = {
    TableName: tableName,
    Key: {
      ownerId: currentUserId,
      surveyId
    },
    UpdateExpression: "set #survey_status = :status",
    ExpressionAttributeNames: {
      "#survey_status": "status"
    },
    ExpressionAttributeValues: {
      ":status": status,
    }
  };

  dynamodb.update(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not publish item: ' + err});
    } else {
      res.json({data});
    }
  });
});

// add answers
app.put('/surveys/answers', function (req, res) {
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});


// delete by Id
app.delete('/surveys', function (req, res) {
  const userId = getUserId(req);
  const {surveyId} = req.query;

  let params = {
    TableName: tableName,
    Key: {
      surveyId,
      ownerId: userId,
    }
  };

  dynamodb.delete(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not delete item: ' + err});
    } else {
      res.json({data});
    }
  });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
