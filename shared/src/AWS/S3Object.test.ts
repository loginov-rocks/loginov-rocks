import { S3Object } from './S3Object';

class S3Mock {
  // eslint-disable-next-line class-methods-use-this
  putObject({ Body }: { Body: string }): { promise: () => Promise<void> } {
    return {
      promise: () => {
        if (Body !== 'Mock') {
          return Promise.reject();
        }

        return Promise.resolve();
      },
    };
  }
}

describe('write', () => {
  it('calls S3 putObject method', async () => {
    const s3 = new S3Mock();

    const s3Object = new S3Object({
      bucketName: 'bucketName',
      fileKey: 'fileKey',
      // @ts-ignore
      s3,
    });

    await expect(s3Object.write('Mock')).resolves.toBeUndefined();
  });
});
