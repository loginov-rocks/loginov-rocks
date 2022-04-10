const { S3 } = require('aws-sdk');
const path = require('path');

const buildGatsby = require('./buildGatsby');
const collectFilesPaths = require('./collectFilesPaths');
const deployFilesToS3 = require('./deployFilesToS3');

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const bucketName = process.env.WEB_APP_S3_BUCKET_NAME;
const publicDirectoryPath = path.resolve(__dirname, '..', process.env.PUBLIC_DIRECTORY_RELATIVE_PATH);

const stdout = (data) => {
  console.log('Stdout:', data);
};

const stderr = (data) => {
  console.error('Stderr:', data);
};

exports.handler = async (event) => {
  console.log('Event:', event);

  const buildGatsbyResult = await buildGatsby(stdout, stderr);

  if (buildGatsbyResult !== 0) {
    throw new Error('Build Gatsby failed');
  }

  const filesPaths = await collectFilesPaths(publicDirectoryPath);

  if (filesPaths.length === 0) {
    throw new Error('No files paths collected');
  }

  console.log('Files Paths:', filesPaths);

  const deployFilesToS3Results = await deployFilesToS3(s3, bucketName, publicDirectoryPath, filesPaths);

  return {};
};
