import AWS from 'aws-sdk';

interface Options {
  bucket: string;
  key: string;
}

export class S3Object {
  private readonly bucket: string;

  private readonly key: string;

  private readonly s3: AWS.S3;

  constructor({ bucket, key }: Options) {
    this.bucket = bucket;
    this.key = key;
    this.s3 = new AWS.S3();
  }

  async update(data: unknown): Promise<void> {
    await this.s3.putObject({
      Body: JSON.stringify(data),
      Bucket: this.bucket,
      ContentType: 'application/json',
      Key: this.key,
    }).promise();
  }
}
