/* eslint-disable import/no-import-module-exports */

import {
  GITHUB_BASE_URL, GITHUB_PERSONAL_ACCESS_TOKEN, DATA_S3_BUCKET_NAME, DATA_S3_GITHUB_FILE_KEY,
} from 'Constants';
import { GitHub } from 'GitHub/GitHub';
import { S3Object } from 'S3Object/S3Object';

const gitHub = new GitHub({
  baseUrl: GITHUB_BASE_URL,
  personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
});

const s3Object = new S3Object({
  bucketName: DATA_S3_BUCKET_NAME,
  fileKey: DATA_S3_GITHUB_FILE_KEY,
});

// TODO: Update S3 object only if changed to avoid unnecessary web app rebuild.
exports.handler = async (): Promise<Record<string, never>> => {
  const data = await gitHub.getData();
  await s3Object.update(data);

  return {};
};
