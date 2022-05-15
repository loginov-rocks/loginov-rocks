import { S3 } from 'aws-sdk';
import { config } from 'dotenv';

import { HomeRoute } from './HomeRoute';
import { Routes } from './Routes';

config();

const s3Configuration = {};

if (process.env.LAMBDA_USE_POLICY !== 'true') {
  s3Configuration.accessKeyId = process.env.LAMBDA_ACCESS_KEY_ID;
  s3Configuration.secretAccessKey = process.env.LAMBDA_SECRET_ACCESS_KEY;
}

const s3 = new S3(s3Configuration);

const routes = new Routes();

const homeRoute = new HomeRoute({
  dataS3BucketName: process.env.DATA_S3_BUCKET_NAME,
  dataS3GitHubFileKey: process.env.DATA_S3_GITHUB_FILE_KEY,
  dataS3HomeFileKey: process.env.DATA_S3_HOME_FILE_KEY,
  s3,
});

routes.register('/', homeRoute);

export default routes;
