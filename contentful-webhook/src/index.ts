/* eslint-disable import/no-import-module-exports */

import { SQS } from 'aws-sdk';

import { AUTH_PASSWORD, AUTH_USERNAME, SQS_QUEUE_URL } from 'Constants';

import { authorize } from './authorize';

const sqs = new SQS();

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

  if (!authorize(authHeader, AUTH_USERNAME, AUTH_PASSWORD)) {
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
