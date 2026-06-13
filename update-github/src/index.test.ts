import type { GitHubData } from '@loginov-rocks/loginov-rocks-shared';
import type { ScheduledEvent } from 'aws-lambda';

import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'node:fs';
import path from 'node:path';

function readFixture(name: string): string {
  return readFileSync(path.join(__dirname, '__fixtures__', name), 'utf8');
}

const event = JSON.parse(readFixture('event.json')) as ScheduledEvent;

const mockGetValue = jest.fn();
const mockGetData = jest.fn();
const mockSetPersonalAccessToken = jest.fn();
const mockS3Send = jest.fn();

jest.mock('@aws-sdk/client-s3', () => ({
  GetObjectCommand: jest.fn(),
  PutObjectCommand: jest.fn(),
  S3Client: jest.fn(() => ({ send: mockS3Send })),
}));

jest.mock('@aws-sdk/client-secrets-manager', () => ({
  SecretsManagerClient: jest.fn(),
}));

jest.mock('@loginov-rocks/loginov-rocks-shared', () => ({
  CachedSecretsManagerClient: jest.fn(() => ({ getValue: mockGetValue })),
}));

jest.mock('./GitHubClient.ts', () => ({
  GitHubClient: jest.fn(() => ({
    getData: mockGetData,
    setPersonalAccessToken: mockSetPersonalAccessToken,
  })),
}));

jest.mock('./constants.ts', () => ({
  DATA_BUCKET_NAME: 'DATA_BUCKET_NAME',
  DATA_GITHUB_FILE_KEY: 'DATA_GITHUB_FILE_KEY',
  GITHUB_BASE_URL: 'GITHUB_BASE_URL',
  SECRET_ARN: 'SECRET_ARN',
  SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY: 'SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY',
}));

const GetObjectCommandMock = GetObjectCommand as unknown as jest.Mock;
const PutObjectCommandMock = PutObjectCommand as unknown as jest.Mock;

const personalAccessToken = 'personal-access-token';

const data: GitHubData = {
  homepageUrl: 'https://loginov.rocks',
  login: 'loginov-rocks',
  repositories: [],
  url: 'https://github.com/loginov-rocks',
};

function buildS3Object(body: string): { Body: { transformToString: () => Promise<string> } } {
  return { Body: { transformToString: () => Promise.resolve(body) } };
}

describe('handler', () => {
  let handler: typeof import('./index.ts').handler;

  beforeAll(async () => {
    ({ handler } = await import('./index.ts'));
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetValue.mockResolvedValue(personalAccessToken);
    mockGetData.mockResolvedValue(data);
  });

  it('writes the new GitHub data file when the data has changed', async () => {
    mockS3Send
      .mockResolvedValueOnce(buildS3Object('{"stale":true}'))
      .mockResolvedValueOnce({});

    await handler(event);

    expect(mockGetValue).toHaveBeenCalledWith('SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY');
    expect(mockSetPersonalAccessToken).toHaveBeenCalledWith(personalAccessToken);
    expect(GetObjectCommandMock).toHaveBeenCalledWith({
      Bucket: 'DATA_BUCKET_NAME',
      Key: 'DATA_GITHUB_FILE_KEY',
    });
    expect(PutObjectCommandMock).toHaveBeenCalledTimes(1);
    expect(PutObjectCommandMock).toHaveBeenCalledWith({
      Body: JSON.stringify(data),
      Bucket: 'DATA_BUCKET_NAME',
      ContentType: 'application/json',
      Key: 'DATA_GITHUB_FILE_KEY',
    });
    expect(mockS3Send).toHaveBeenCalledTimes(2);
  });

  it('skips writing when the GitHub data has not changed', async () => {
    mockS3Send.mockResolvedValueOnce(buildS3Object(JSON.stringify(data)));

    await handler(event);

    expect(PutObjectCommandMock).not.toHaveBeenCalled();
    expect(mockS3Send).toHaveBeenCalledTimes(1);
  });

  it('writes the new GitHub data file when the current file does not exist', async () => {
    const error = new Error('No such key');
    error.name = 'NoSuchKey';

    mockS3Send
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce({});

    await handler(event);

    expect(PutObjectCommandMock).toHaveBeenCalledTimes(1);
    expect(mockS3Send).toHaveBeenCalledTimes(2);
  });

  it('rethrows unexpected errors when getting the current file', async () => {
    const error = new Error('Internal Server Error');
    error.name = 'InternalServerError';

    mockS3Send.mockRejectedValueOnce(error);

    await expect(handler(event)).rejects.toThrow('Internal Server Error');
    expect(PutObjectCommandMock).not.toHaveBeenCalled();
  });
});
