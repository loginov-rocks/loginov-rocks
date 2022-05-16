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

// TODO: Update S3 object only if changed to avoid unnecessary web app rebuild.
exports.handler = async (): Promise<Record<string, never>> => {
  const data = await gitHub.getData();
  await s3Object.write(JSON.stringify(data), { contentType: 'application/json' });

  return {};
};
