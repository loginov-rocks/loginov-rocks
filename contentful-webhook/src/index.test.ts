import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { readFileSync } from 'node:fs';
import path from 'node:path';

function readFixture(name: string): string {
  return readFileSync(path.join(__dirname, '__fixtures__', name), 'utf8');
}

const event = JSON.parse(readFixture('event.json')) as APIGatewayProxyEventV2;
const message = JSON.parse(readFixture('message.json')) as Record<string, unknown>;

const mockGetValue = jest.fn();
const mockSqsSend = jest.fn();

jest.mock('@aws-sdk/client-secrets-manager', () => ({
  SecretsManagerClient: jest.fn(),
}));

jest.mock('@aws-sdk/client-sqs', () => ({
  SendMessageCommand: jest.fn(),
  SQSClient: jest.fn(() => ({ send: mockSqsSend })),
}));

jest.mock('@loginov-rocks/loginov-rocks-shared', () => ({
  CachedSecretsManagerClient: jest.fn(() => ({ getValue: mockGetValue })),
}));

jest.mock('./constants.ts', () => ({
  SECRET_ARN: 'SECRET_ARN',
  SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY: 'SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY',
  SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY: 'SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY',
  SQS_QUEUE_URL: 'SQS_QUEUE_URL',
}));

const SendMessageCommandMock = SendMessageCommand as unknown as jest.Mock;

const validAuthHeader = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';

const secretValues: Record<string, string> = {
  SECRET_CONTENTFUL_WEBHOOK_AUTH_PASSWORD_KEY: 'password',
  SECRET_CONTENTFUL_WEBHOOK_AUTH_USERNAME_KEY: 'username',
};

function buildEvent(overrides: Partial<APIGatewayProxyEventV2> = {}): APIGatewayProxyEventV2 {
  const request = structuredClone(event);
  request.headers.authorization = validAuthHeader;

  return { ...request, ...overrides };
}

describe('handler', () => {
  let handler: typeof import('./index.ts').handler;

  beforeAll(async () => {
    ({ handler } = await import('./index.ts'));
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetValue.mockImplementation((key: string) => Promise.resolve(secretValues[key]));
    mockSqsSend.mockResolvedValue({ MessageId: 'MESSAGE_ID' });
  });

  it('returns 405 when the method is not POST', async () => {
    const request = buildEvent();
    request.requestContext.http.method = 'GET';

    const response = await handler(request);

    expect(response).toEqual({ body: 'Method Not Allowed', statusCode: 405 });
    expect(mockGetValue).not.toHaveBeenCalled();
    expect(mockSqsSend).not.toHaveBeenCalled();
  });

  it('returns 401 when the authorization header is invalid', async () => {
    const request = buildEvent();
    request.headers.authorization = 'Basic invalid';

    const response = await handler(request);

    expect(response).toEqual({ body: 'Unauthorized', statusCode: 401 });
    expect(mockSqsSend).not.toHaveBeenCalled();
  });

  it('returns 400 when the body is missing', async () => {
    const request = buildEvent({ body: undefined });

    const response = await handler(request);

    expect(response).toEqual({ body: 'Bad Request', statusCode: 400 });
    expect(mockSqsSend).not.toHaveBeenCalled();
  });

  it('sends the decoded message to SQS and returns 200', async () => {
    const request = buildEvent();

    const response = await handler(request);

    expect(SendMessageCommandMock).toHaveBeenCalledTimes(1);
    expect(SendMessageCommandMock).toHaveBeenCalledWith({
      MessageBody: JSON.stringify(message),
      QueueUrl: 'SQS_QUEUE_URL',
    });
    expect(mockSqsSend).toHaveBeenCalledTimes(1);
    expect(mockSqsSend).toHaveBeenCalledWith(SendMessageCommandMock.mock.instances[0]);
    expect(response).toEqual({ body: 'OK', statusCode: 200 });
  });

  it('sends the raw body when it is not base64 encoded', async () => {
    const request = buildEvent({ body: 'raw-message', isBase64Encoded: false });

    await handler(request);

    expect(SendMessageCommandMock).toHaveBeenCalledWith({
      MessageBody: 'raw-message',
      QueueUrl: 'SQS_QUEUE_URL',
    });
  });

  it('returns 500 when sending the message fails', async () => {
    mockSqsSend.mockRejectedValue(new Error('SQS error'));

    const request = buildEvent();

    const response = await handler(request);

    expect(response).toEqual({ body: 'Internal Server Error', statusCode: 500 });
  });
});
