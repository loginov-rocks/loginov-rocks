import { S3Client } from '@aws-sdk/client-s3';
import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { CachedSecretsManagerClient } from '@loginov-rocks/loginov-rocks-shared';
import { config } from 'dotenv';

import { CmsClient } from '../cms/CmsClient';

import { DolphRoute } from './DolphRoute';
import { HomeRoute } from './HomeRoute';
import { LearningRoute } from './LearningRoute';
import { Routes } from './Routes';

// Load environment variables configuration.
config();

// Set up AWS clients.
const s3ClientConfig = {
  region: process.env.LAMBDA_REGION,
};
const secretsManagerClientConfig = {
  region: process.env.LAMBDA_REGION,
};

// Unless in the AWS runtime, use AWS credentials from the environment variables.
if (process.env.LAMBDA_USE_POLICY !== 'true') {
  const credentials = {
    accessKeyId: process.env.LAMBDA_ACCESS_KEY_ID,
    secretAccessKey: process.env.LAMBDA_SECRET_ACCESS_KEY,
  };

  s3ClientConfig.credentials = credentials;
  secretsManagerClientConfig.credentials = credentials;
}

const s3Client = new S3Client(s3ClientConfig);
const secretsManagerClient = new SecretsManagerClient(secretsManagerClientConfig);

const cachedSecretsManagerClient = new CachedSecretsManagerClient({
  secretArn: process.env.SECRET_ARN,
  secretsManagerClient,
});

const cmsClient = new CmsClient({
  accessTokenResolver: () => cachedSecretsManagerClient.getValue(
    process.env.SECRET_WEB_APP_CMS_CLIENT_ACCESS_TOKEN_KEY,
  ),
  spaceResolver: () => cachedSecretsManagerClient.getValue(process.env.SECRET_WEB_APP_CMS_CLIENT_SPACE_KEY),
});

// Set up app routes.
const routes = new Routes();

const homeRoute = new HomeRoute({
  cmsClient,
  cmsHomePageComponentType: process.env.CMS_HOME_PAGE_COMPONENT_TYPE,
  dataS3BucketName: process.env.DATA_BUCKET_NAME,
  dataS3GitHubFileKey: process.env.DATA_GITHUB_FILE_KEY,
  s3Client,
});

// Exporting the route to use in `siteData` since no static route exists for this page.
export const dolphRoute = new DolphRoute({
  cmsClient,
  cmsDolphPageComponentType: process.env.CMS_DOLPH_PAGE_COMPONENT_TYPE,
});

const learningRoute = new LearningRoute({
  cmsClient,
  cmsLearningPageComponentType: process.env.CMS_LEARNING_PAGE_COMPONENT_TYPE,
});

routes.registerRoute('/', homeRoute);
routes.registerRoute('/learning', learningRoute);

export default routes;
