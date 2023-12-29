/* eslint-disable import/no-import-module-exports */

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { CachedSecretsManagerClient } from '@loginov-rocks/loginov-rocks-shared';

import {
  DATA_BUCKET_NAME, DATA_GITHUB_FILE_KEY, GITHUB_BASE_URL, SECRET_ARN,
  SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY,
} from 'Constants';
import { GitHub } from 'GitHub/GitHub';

const s3Client = new S3Client();
const secretsManagerClient = new SecretsManagerClient();

const cachedSecretsManagerClient = new CachedSecretsManagerClient({
  secretArn: SECRET_ARN,
  secretsManagerClient,
});

const gitHub = new GitHub({
  baseUrl: GITHUB_BASE_URL,
});

exports.handler = async (event: unknown): Promise<void> => {
  console.log('event', JSON.stringify(event));

  const personalAccessToken = await cachedSecretsManagerClient.getValue(
    SECRET_UPDATE_GITHUB_GITHUB_PERSONAL_ACCESS_TOKEN_KEY,
  );
  gitHub.setPersonalAccessToken(personalAccessToken);

  console.log('Getting GitHub data...');

  const data = await gitHub.getData();

  console.log('Getting current GitHub data file...');

  const getObjectCommand = new GetObjectCommand({
    Bucket: DATA_BUCKET_NAME,
    Key: DATA_GITHUB_FILE_KEY,
  });

  let s3Object;

  try {
    s3Object = await s3Client.send(getObjectCommand);
  } catch (error: any) {
    if (error.name !== 'NoSuchKey') {
      throw error;
    }
  }

  const currentData = s3Object && s3Object.Body ? await s3Object.Body.transformToString() : '';

  const newData = JSON.stringify(data);

  if (newData === currentData) {
    console.log('GitHub data has not changed, skipping.');

    return;
  }

  console.log('Writing new GitHub data file...');

  const putObjectCommand = new PutObjectCommand({
    Body: newData,
    Bucket: DATA_BUCKET_NAME,
    ContentType: 'application/json',
    Key: DATA_GITHUB_FILE_KEY,
  });

  const putObjectResponse = await s3Client.send(putObjectCommand);

  console.log('putObjectResponse', JSON.stringify(putObjectResponse));
};
