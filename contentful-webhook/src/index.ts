/* eslint-disable import/no-import-module-exports */

import { SecretsManager, SQS } from 'aws-sdk';

import {
  SECRET_ARN, SECRET_AUTH_PASSWORD_KEY, SECRET_AUTH_USERNAME_KEY, SQS_QUEUE_URL,
} from 'Constants';

import { authorize } from './authorize';
import { KeyValueSecret } from './KeyValueSecret';

const secretsManager = new SecretsManager();
const sqs = new SQS();

const keyValueSecret = new KeyValueSecret({
  secretArn: SECRET_ARN,
  secretsManager,
});

exports.handler = async (event: any) => {
  console.log('Event:', JSON.stringify(event));

  const {
    body,
    headers: { authorization: authHeader },
    isBase64Encoded,
    requestContext: { http: { method } },
  } = event;

  if (method !== 'POST') {
    return {
      body: 'Method Not Allowed',
      statusCode: 405,
    };
  }

  const authUsername = await keyValueSecret.getValue(SECRET_AUTH_USERNAME_KEY);
  const authPassword = await keyValueSecret.getValue(SECRET_AUTH_PASSWORD_KEY);

  if (!authorize(authHeader, authUsername, authPassword)) {
    return {
      body: 'Unauthorized',
      statusCode: 401,
    };
  }

  if (!body) {
    return {
      body: 'Bad Request',
      statusCode: 400,
    };
  }

  const message = isBase64Encoded ? Buffer.from(body, 'base64').toString() : body;

  try {
    await sqs.sendMessage({
      MessageBody: message,
      QueueUrl: SQS_QUEUE_URL,
    }).promise();
  } catch (error) {
    console.error(error);

    return {
      body: 'Internal Server Error',
      statusCode: 500,
    };
  }

  return {
    body: 'OK',
    statusCode: 200,
  };
};
