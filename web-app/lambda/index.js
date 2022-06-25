const { CloudFrontInvalidation } = require('@loginov-rocks/loginov-rocks-shared');
const { CloudFront, S3 } = require('aws-sdk');
const { tmpdir } = require('os');
const path = require('path');

const build = require('./build');
const collectFilesPaths = require('./collectFilesPaths');
const deployFilesToS3 = require('./deployFilesToS3');

const cloudFrontConfiguration = {};
const s3Configuration = {};

if (process.env.LAMBDA_USE_POLICY !== 'true') {
  cloudFrontConfiguration.accessKeyId = process.env.LAMBDA_ACCESS_KEY_ID;
  cloudFrontConfiguration.secretAccessKey = process.env.LAMBDA_SECRET_ACCESS_KEY;

  s3Configuration.accessKeyId = process.env.LAMBDA_ACCESS_KEY_ID;
  s3Configuration.secretAccessKey = process.env.LAMBDA_SECRET_ACCESS_KEY;
}

const cloudFront = new CloudFront(cloudFrontConfiguration);
const s3 = new S3(s3Configuration);

const cloudFrontInvalidation = new CloudFrontInvalidation({
  cloudFront,
  distributionId: process.env.LAMBDA_CLOUDFRONT_DISTRIBUTION_ID,
  path: process.env.LAMBDA_CLOUDFRONT_INVALIDATION_PATH,
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
  console.log('Event:', JSON.stringify(event));

  console.log('Building...');

  const buildResult = await build(stdout, stderr);

  if (buildResult !== 0) {
    throw new Error('Build failed');
  }

  console.log('Collecting files paths...');

  const filesPaths = await collectFilesPaths(distDirectoryPath);

  if (filesPaths.length === 0) {
    throw new Error('No files paths collected');
  }

  console.log('Files paths collected:', filesPaths);

  console.log('Deploying files to S3...');

  await deployFilesToS3(s3, bucketName, distDirectoryPath, filesPaths);

  console.log('Invalidating CloudFront...');

  await cloudFrontInvalidation.invalidate();

  return {};
};
