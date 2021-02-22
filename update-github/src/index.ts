import {
  GITHUB_PERSONAL_ACCESS_TOKEN, WEB_APP_CLOUDFRONT_DISTRIBUTION_ID, WEB_APP_S3_BUCKET_NAME, WEB_APP_S3_GITHUB_FILE_KEY,
} from 'Constants';
import { CloudFrontInvalidation } from 'CloudFrontInvalidation/CloudFrontInvalidation';
import { GitHub } from 'GitHub/GitHub';
import { S3Object } from 'S3Object/S3Object';

const cloudFrontInvalidation = new CloudFrontInvalidation({
  distributionId: WEB_APP_CLOUDFRONT_DISTRIBUTION_ID,
  path: `/${WEB_APP_S3_GITHUB_FILE_KEY}`,
});

const gitHub = new GitHub({
  personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
});

const s3Object = new S3Object({
  bucketName: WEB_APP_S3_BUCKET_NAME,
  fileKey: WEB_APP_S3_GITHUB_FILE_KEY,
});

exports.handler = async (): Promise<Record<string, never>> => {
  const data = await gitHub.getData();
  await s3Object.update(data);
  await cloudFrontInvalidation.invalidate();

  return {};
};
