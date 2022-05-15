export class S3Object {
  constructor({ bucketName, fileKey, s3 }) {
    this.bucketName = bucketName;
    this.fileKey = fileKey;
    this.s3 = s3;
  }

  async read() {
    const s3Object = await this.s3.getObject({
      Bucket: this.bucketName,
      Key: this.fileKey,
    }).promise();

    return s3Object.Body;
  }
}
