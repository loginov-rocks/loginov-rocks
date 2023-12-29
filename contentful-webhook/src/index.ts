/* eslint-disable import/no-import-module-exports */

import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { CachedSecretsManagerClient } from '@loginov-rocks/loginov-rocks-shared';

import {
  SECRET_ARN, SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY, SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY, SQS_QUEUE_URL,
} from 'Constants';
import { Event } from 'Event';
import { Response } from 'Response';

import { authorize } from './authorize';

const secretsManagerClient = new SecretsManagerClient();
const sqsClient = new SQSClient();

const cachedSecretsManagerClient = new CachedSecretsManagerClient({
  secretArn: SECRET_ARN,
  secretsManagerClient,
});

exports.handler = async (event: Event): Promise<Response> => {
  console.log('event', JSON.stringify(event));

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

  const authUsername = await cachedSecretsManagerClient.getValue(SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY);
  const authPassword = await cachedSecretsManagerClient.getValue(SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY);

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

  console.log('message', message);

  const sendMessageCommand = new SendMessageCommand({
    MessageBody: message,
    QueueUrl: SQS_QUEUE_URL,
  });

  let sendMessageResponse;

  try {
    sendMessageResponse = await sqsClient.send(sendMessageCommand);
  } catch (error) {
    console.error(error);

    return {
      body: 'Internal Server Error',
      statusCode: 500,
    };
  }

  console.log('sendMessageResponse', JSON.stringify(sendMessageResponse));

  return {
    body: 'OK',
    statusCode: 200,
  };
};
