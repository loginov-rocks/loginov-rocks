const { S3 } = require('aws-sdk');
const { tmpdir } = require('os');
const path = require('path');

const build = require('./build');
const collectFilesPaths = require('./collectFilesPaths');
const deployFilesToS3 = require('./deployFilesToS3');

const s3Configuration = {};

if (process.env.LAMBDA_USE_POLICY !== 'true') {
  s3Configuration.accessKeyId = process.env.LAMBDA_ACCESS_KEY_ID;
  s3Configuration.secretAccessKey = process.env.LAMBDA_SECRET_ACCESS_KEY;
}

const s3 = new S3(s3Configuration);

// const cloudFrontInvalidation = new CloudFrontInvalidation({
//   distributionId: WEB_APP_CLOUDFRONT_DISTRIBUTION_ID,
//   path: `/${WEB_APP_S3_GITHUB_FILE_KEY}`,
// });

const bucketName = process.env.LAMBDA_S3_BUCKET_NAME;
const distDirectoryPath = process.env.LAMBDA_USE_TMPDIR === 'true' ? `${tmpdir()}/dist` : path.resolve('dist');

const stdout = (data) => {
  console.log('Stdout:', data);
};

const stderr = (data) => {
  console.error('Stderr:', data);
};

// TODO: Remove unnecessary files from the S3 bucket.
// TODO: Invalidate the CloudFront distribution.
exports.handler = async (event) => {
  console.log('Event:', event);

  const buildResult = await build(stdout, stderr);

  if (buildResult !== 0) {
    throw new Error('Build failed');
  }

  const filesPaths = await collectFilesPaths(distDirectoryPath);

  if (filesPaths.length === 0) {
    throw new Error('No files paths collected');
  }

  console.log('Files Paths:', filesPaths);

  await deployFilesToS3(s3, bucketName, distDirectoryPath, filesPaths);

  // await cloudFrontInvalidation.invalidate();

  return {};
};
