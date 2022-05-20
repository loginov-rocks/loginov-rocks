/* eslint-disable import/no-import-module-exports */

import { S3Object } from '@loginov-rocks/loginov-rocks-shared';
import { S3 } from 'aws-sdk';

import {
  GITHUB_BASE_URL, GITHUB_PERSONAL_ACCESS_TOKEN, DATA_S3_BUCKET_NAME, DATA_S3_GITHUB_FILE_KEY,
} from 'Constants';
import { GitHub } from 'GitHub/GitHub';

const gitHub = new GitHub({
  baseUrl: GITHUB_BASE_URL,
  personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
});

const s3 = new S3();

const s3Object = new S3Object({
  bucketName: DATA_S3_BUCKET_NAME,
  fileKey: DATA_S3_GITHUB_FILE_KEY,
  s3,
});

exports.handler = async (event: any): Promise<Record<string, never>> => {
  console.log('Event:', JSON.stringify(event));

  console.log('Getting GitHub data...');

  const data = await gitHub.getData();

  console.log('Getting current GitHub data file...');

  const currentData = await s3Object.read();

  const newData = JSON.stringify(data);

  if (newData === currentData) {
    console.log('GitHub data has not changed, skipping');
  } else {
    console.log('Writing new GitHub data file...');
    await s3Object.write(newData, { contentType: 'application/json' });
  }

  return {};
};
