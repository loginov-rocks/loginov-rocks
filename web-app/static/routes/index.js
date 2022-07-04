import { KeyValueSecret } from '@loginov-rocks/loginov-rocks-shared';
import { S3, SecretsManager } from 'aws-sdk';
import { config } from 'dotenv';

import { CmsClient } from '../cms/CmsClient';

import { DolphRoute } from './DolphRoute';
import { HomeRoute } from './HomeRoute';
import { Routes } from './Routes';

// Load environment variables configuration.
config();

const s3Configuration = {};
const secretsManagerConfiguration = {
  region: process.env.LAMBDA_REGION,
};

if (process.env.LAMBDA_USE_POLICY !== 'true') {
  s3Configuration.accessKeyId = process.env.LAMBDA_ACCESS_KEY_ID;
  s3Configuration.secretAccessKey = process.env.LAMBDA_SECRET_ACCESS_KEY;

  secretsManagerConfiguration.accessKeyId = process.env.LAMBDA_ACCESS_KEY_ID;
  secretsManagerConfiguration.secretAccessKey = process.env.LAMBDA_SECRET_ACCESS_KEY;
}

const s3 = new S3(s3Configuration);
const secretsManager = new SecretsManager(secretsManagerConfiguration);

const keyValueSecret = new KeyValueSecret({
  secretArn: process.env.SECRET_ARN,
  secretsManager,
});

const cmsClient = new CmsClient({
  accessTokenResolver: () => keyValueSecret.getValue(process.env.SECRET_CMS_CLIENT_ACCESS_TOKEN_KEY),
  spaceResolver: () => keyValueSecret.getValue(process.env.SECRET_CMS_CLIENT_SPACE_KEY),
});

const routes = new Routes();

const homeRoute = new HomeRoute({
  cmsClient,
  cmsHomePageComponentType: process.env.CMS_HOME_PAGE_COMPONENT_TYPE,
  dataS3BucketName: process.env.DATA_S3_BUCKET_NAME,
  dataS3GitHubFileKey: process.env.DATA_S3_GITHUB_FILE_KEY,
  s3,
});

// Export to use in `siteData` since no static route exists for this page.
export const dolphRoute = new DolphRoute({
  cmsClient,
  cmsDolphPageComponentType: process.env.CMS_DOLPH_PAGE_COMPONENT_TYPE,
});

routes.registerRoute('/', homeRoute);

// Default export used to highlight singleton pattern.
export default routes;
