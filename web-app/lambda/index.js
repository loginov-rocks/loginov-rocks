const { CloudFrontClient } = require('@aws-sdk/client-cloudfront');
const { S3Client } = require('@aws-sdk/client-s3');
const { CloudFrontInvalidation } = require('@loginov-rocks/loginov-rocks-shared');
const { tmpdir } = require('os');
const path = require('path');

const build = require('./build');
const collectFilesPaths = require('./collectFilesPaths');
const deployFilesToS3 = require('./deployFilesToS3');

// Set up AWS clients.
const cloudFrontClientConfig = {
  region: process.env.LAMBDA_REGION,
};
const s3ClientConfig = {
  region: process.env.LAMBDA_REGION,
};

// Unless in the AWS runtime, use AWS credentials from the environment variables.
if (process.env.LAMBDA_USE_POLICY !== 'true') {
  const credentials = {
    accessKeyId: process.env.LAMBDA_ACCESS_KEY_ID,
    secretAccessKey: process.env.LAMBDA_SECRET_ACCESS_KEY,
  };

  cloudFrontClientConfig.credentials = credentials;
  s3ClientConfig.credentials = credentials;
}

const cloudFrontClient = new CloudFrontClient(cloudFrontClientConfig);
const s3Client = new S3Client(s3ClientConfig);

const cloudFrontInvalidation = new CloudFrontInvalidation({
  cloudFrontClient,
  distributionId: process.env.LAMBDA_CLOUDFRONT_DISTRIBUTION_ID,
  paths: [
    process.env.LAMBDA_CLOUDFRONT_INVALIDATION_PATH,
  ],
});

const bucketName = process.env.LAMBDA_WEB_APP_S3_BUCKET_NAME;
const distDirectoryPath = process.env.LAMBDA_USE_TMPDIR === 'true' ? `${tmpdir()}/dist` : path.resolve('dist');

const stdout = (data) => {
  console.log('Stdout:', data);
};

const stderr = (data) => {
  console.error('Stderr:', data);
};

exports.handler = async (event) => {
  console.log('event', JSON.stringify(event));
  console.log('bucketName', bucketName);
  console.log('distDirectoryPath', distDirectoryPath);
  console.log('Building...');

  const buildResult = await build(stdout, stderr);

  if (buildResult !== 0) {
    throw new Error('Build failed.');
  }

  console.log('Collecting files paths...');

  const filesPaths = await collectFilesPaths(distDirectoryPath);

  if (filesPaths.length === 0) {
    throw new Error('No files paths collected.');
  }

  console.log('filesPaths', filesPaths.length, JSON.stringify(filesPaths));
  console.log('Deploying files to S3...');

  const deployResponses = await deployFilesToS3(s3Client, bucketName, distDirectoryPath, filesPaths);

  console.log('deployResponses', deployResponses.length, JSON.stringify(deployResponses));
  console.log('Invalidating CloudFront...');

  const invalidateResponse = await cloudFrontInvalidation.invalidate();

  console.log('invalidateResponse', JSON.stringify(invalidateResponse));
};
