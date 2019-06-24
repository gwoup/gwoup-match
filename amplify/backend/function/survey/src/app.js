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
const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})

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
const demoUserId = "";
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

const getCognitoUserPoolId = (req) => {
  if (userIdPresent) {
    const authProvider = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider;
    const parts = authProvider.split(',')[0].split('/');
    return parts[parts.length - 1];
  }

  return "";
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

// Get by Pin
app.get('/surveys/by-pin', function (req, res) {
  const currentUserId = getUserId(req);
  const {pin} = req.query;

  let params = {
    TableName: tableName,
    IndexName: "pin",
    KeyConditionExpression: "pin = :pin",
    ExpressionAttributeValues: {
      ":pin": pin,
    },
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not find item: ' + err});
    } else {
      if (data.Items.length) {
        const survey = data.Items[0];
        const {title, questions, status, surveyId} = survey;
        if (survey.status === "PUBLISHED" || survey.status === "COMPLETED") {

          res.json({
            title,
            questions,
            status,
            surveyId,
            answered: tookPartInSurvey(currentUserId, survey.responses)
          });

        } else {
          res.statusCode = 404;
          res.json({error: 'survey is not available'});
        }
      } else {
        res.statusCode = 404;
        res.json({error: 'survey is not available'});
      }
    }
  });
});

// Get status by Id
app.get('/surveys/status/:surveyId', function (req, res) {
  const currentUserId = getUserId(req);
  const {surveyId} = req.params;

  let params = {
    TableName: tableName,
    Key: {
      surveyId
    }
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not find item: ' + err});
    } else {
      if (data.Item) {
        const survey = data.Item;
        // is owner or took part in responses

        if (survey.ownerId !== currentUserId && !tookPartInSurvey(currentUserId, survey.responses)) {
          res.statusCode = 403;
          return;
        }

        const {surveyId, status, title, minGroupSize, maxGroupSize, preferredGroupSize, pin} = survey;

        res.json({
          surveyId,
          title,
          minGroupSize,
          maxGroupSize,
          preferredGroupSize,
          pin,
          status,
          answersNumber: survey.responses.length
        });
      } else {
        res.statusCode = 404;
        res.json({});
      }
    }
  });
});

// Get groups by Id
app.get('/surveys/groups/:surveyId', function (req, res) {
  const currentUserId = getUserId(req);
  const {surveyId} = req.params;

  let params = {
    TableName: tableName,
    Key: {
      surveyId
    }
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not find item: ' + err});
    } else {
      if (data.Item) {
        const survey = data.Item;
        // is owner or took part in responses

        if (survey.ownerId !== currentUserId && !tookPartInSurvey(currentUserId, survey.responses)) {
          res.statusCode = 403;
          return;
        }

        const {surveyId, status, title, groups, pin} = survey;

        res.json({
          surveyId,
          title,
          pin,
          groups,
          status,
        });
      } else {
        res.statusCode = 404;
        res.json({});
      }
    }
  });
});

// create groups by Id
app.post('/surveys/groups/:surveyId', function (req, res) {
  const currentUserId = getUserId(req);
  const {surveyId} = req.params;

  let params = {
    TableName: tableName,
    Key: {
      surveyId
    }
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not find item: ' + err});
    } else {
      if (data.Item) {
        const survey = data.Item;
        // is owner or took part in responses

        if (survey.ownerId !== currentUserId) {
          res.statusCode = 403;
          return;
        }

        if (survey.status !== "PUBLISHED") {
          res.statusCode = 410;
          res.json({error: "Survey has to be published"});
          return;
        }

        if (survey.groups && survey.groups.length > 0) {
          res.statusCode = 410;
          res.json({error: "Groups already generated"});
          return;
        }

        const userIds = survey.responses.map(response => response.userId);
        const randomizedUserIds = shuffle([...userIds]);

        const GROUPS_NUMBER = 3;
        let generatedGroups = new Array(GROUPS_NUMBER);
        for (let i = 0; i < generatedGroups.length; i++) {
          generatedGroups[i] = [];
        }

        for (let i = 0; i < randomizedUserIds.length; i++) {
          let groupIndex = i % GROUPS_NUMBER;
          const user = survey.responses.find(response => response.userId === randomizedUserIds[i]);

          generatedGroups[groupIndex].push({
            full_name: user.full_name,
            userId: randomizedUserIds[i]
          });
        }

        let params = {
          TableName: tableName,
          Key: {
            surveyId
          },
          UpdateExpression: "set #survey_status = :status, groups = :groups",
          ConditionExpression: "ownerId = :ownerId",
          ExpressionAttributeNames: {
            "#survey_status": "status"
          },
          ExpressionAttributeValues: {
            ":status": "COMPLETED",
            ":groups": generatedGroups,
            ":ownerId": currentUserId
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
      } else {
        res.statusCode = 404;
        res.json({});
      }
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
      surveyId
    }
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not find item: ' + err});
    } else {
      console.log('get by id', data);
      if (data[0].ownerId === currentUserId) {
        res.json({...data[0]});
      } else {
        res.statusCode = 403;
        res.json({error: "You don't have permissions to read this item"});
      }
    }
  });
});

// create
app.post('/surveys', function (req, res) {
  const currentUserId = getUserId(req);
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
      groups: [],
      questions,
      status: 'DRAFT',
      ownerId: currentUserId,
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
      surveyId
    },
    ConditionExpression: "ownerId = :ownerId",
    UpdateExpression: "set title = :title, responses = :responses, minGroupSize = :minGroupSize, maxGroupSize = :maxGroupSize, preferredGroupSize = :preferredGroupSize, questions = :questions",
    ExpressionAttributeValues: {
      ":ownerId": currentUserId,
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
      surveyId
    },
    UpdateExpression: "set #survey_status = :status",
    ConditionExpression: "ownerId = :ownerId",
    ExpressionAttributeNames: {
      "#survey_status": "status"
    },
    ExpressionAttributeValues: {
      ":status": status,
      ":ownerId": currentUserId
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

const tookPartInSurvey = (userId, responses) => {
  return responses.some(response => response.userId === userId);
};

const getUserName = async (cognitoUserPoolId, userId) => {
  try {
    const user = await cognito.adminGetUser({
      UserPoolId: cognitoUserPoolId, //process.env.COGNITO_USER_POOL_ID,
      Username: userId,
    }).promise();

    return user.UserAttributes.find(attr => attr.Name === "name").Value;
  } catch (err) {
    console.log('error fetching user info: ', err);
    throw err;
  }
};

// add answers
app.post('/surveys/answers', function (req, res) {
  const currentUserId = getUserId(req);
  const {pin, answers} = req.body;

  // + get by pin - is survey available in status "PUBLISHED"
  // + check - is current user answer already available
  // - answers and corresponding questions has to be available
  // - answers format for corresponding questions (JSON validation)

  let params = {
    TableName: tableName,
    IndexName: "pin",
    KeyConditionExpression: "pin = :pin",
    ExpressionAttributeValues: {
      ":pin": pin,
    },
  };

  dynamodb.query(params, async (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not find item: ' + err});
    } else {
      if (data.Items.length) {
        const survey = data.Items[0];

        const {responses, status, surveyId} = survey;

        if (status !== "PUBLISHED") {
          res.statusCode = 403;
          res.json({error: 'survey is not available for answers'});
          return;
        }

        if (tookPartInSurvey(currentUserId, responses)) {
          res.statusCode = 403;
          res.json({error: 'survey was already answered by the current user'});
          return;
        }

        let answerParams = {
          TableName: tableName,
          Key: {
            surveyId,
          },
          UpdateExpression: "SET #attrName = list_append(#attrName, :attrValue)",
          ExpressionAttributeNames: {
            "#attrName": "responses"
          },
          ExpressionAttributeValues: {
            ":attrValue": [{
              "userId": currentUserId,
              "full_name": await getUserName(getCognitoUserPoolId(req), currentUserId),
              "answers": answers
            }]
          }
        };

        dynamodb.update(answerParams, (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.json({error: 'Could not add answer: ' + err});
          } else {
            res.json({status: "OK"});
          }
        });
      } else {
        res.statusCode = 404;
        res.json({error: 'survey is not available'});
      }
    }
  });
});


// delete by Id
app.delete('/surveys', function (req, res) {
  const currentUserId = getUserId(req);
  const {surveyId} = req.query;

  let params = {
    TableName: tableName,
    Key: {
      surveyId
    },
    ConditionExpression: "ownerId = :ownerId",
    ExpressionAttributeValues: {
      ":ownerId": currentUserId
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


function shuffle(array) {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
