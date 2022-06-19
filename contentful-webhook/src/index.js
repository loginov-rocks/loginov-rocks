const { SQS } = require('aws-sdk');

const authPassword = process.env.AUTH_PASSWORD;
const authUser = process.env.AUTH_USER;
const sqsQueueUrl = process.env.SQS_QUEUE_URL;

const sqs = new SQS();

exports.handler = async (event) => {
  console.log(JSON.stringify(event));

  const {
    body,
    headers: { authorization },
    isBase64Encoded,
    requestContext: { http: { method } },
  } = event;

  if (method !== 'POST') {
    return {
      body: 'Method Not Allowed',
      statusCode: 405,
    };
  }

  if (!authorization) {
    return {
      body: 'Unauthorized',
      statusCode: 401,
    };
  }

  const credentials = `${authUser}:${authPassword}`;
  const credentialsEncoded = new Buffer(credentials).toString('base64');
  const authString = `Basic ${credentialsEncoded}`;

  if (authorization !== authString) {
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

  const message = isBase64Encoded ? new Buffer(body, 'base64').toString() : body;

  try {
    await sqs.sendMessage({
      MessageBody: message,
      QueueUrl: sqsQueueUrl,
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
