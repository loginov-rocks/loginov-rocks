const { S3Object } = require('@loginov-rocks/loginov-rocks-shared');
const fs = require('fs');
const mime = require('mime');

module.exports = async (s3, bucketName, rootDirectoryPath, filesPaths) => {
  const s3ListObjects = await s3.listObjects({ Bucket: bucketName }).promise();
  const filesKeys = s3ListObjects.Contents.map(({ Key }) => Key);
  const filesKeysToWrite = [];

  const writeOperations = filesPaths.map((filePath) => {
    const fileKey = filePath.substring(rootDirectoryPath.length + 1);
    filesKeysToWrite.push(fileKey);

    const data = fs.readFileSync(filePath);
    const contentType = mime.getType(filePath);
    const s3Object = new S3Object({ bucketName, fileKey, s3 });

    return s3Object.write(data, { contentType });
  });

  console.log('Files keys to write:', filesKeysToWrite);

  const filesKeysToDelete = filesKeys.filter((fileKey) => !filesKeysToWrite.includes(fileKey));
  const batchDeleteOptions = filesKeysToDelete.map((fileKey) => ({ bucketName, fileKey }));
  const batchDeleteOperation = S3Object.batchDelete(s3, batchDeleteOptions);

  console.log('Files keys to delete:', filesKeysToDelete);

  return Promise.all([
    ...writeOperations,
    batchDeleteOperation,
  ]);
};
