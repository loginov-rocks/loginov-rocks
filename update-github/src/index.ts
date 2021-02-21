import gitHub from 'GitHub';
import s3Object from 'S3Object';

exports.handler = async (): Promise<Record<string, never>> => {
  const data = await gitHub.getData();
  await s3Object.update(data);

  return {};
};
