const { DeleteObjectsCommand, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const mime = require('mime');

const s3DeleteObjects = (s3Client, bucketName, fileKeys) => {
  const deleteObjectsCommand = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      Objects: fileKeys.map((fileKey) => ({ Key: fileKey })),
    },
  });

  return s3Client.send(deleteObjectsCommand);
};

const s3ListObjects = async (s3Client, bucketName) => {
  const listObjectsCommand = new ListObjectsV2Command({
    Bucket: bucketName,
    MaxKeys: 1000,
  });

  const listObjectsResponse = await s3Client.send(listObjectsCommand);

  if (!listObjectsResponse.KeyCount || listObjectsResponse.KeyCount === 0
    || !listObjectsResponse.Contents || !Array.isArray(listObjectsResponse.Contents)) {
    return [];
  }

  return listObjectsResponse.Contents.map(({ Key }) => Key);
};

const s3PutObject = (s3Client, bucketName, fileKey, data, contentType) => {
  const putObjectCommand = new PutObjectCommand({
    Body: data,
    Bucket: bucketName,
    ContentType: contentType,
    Key: fileKey,
  });

  return s3Client.send(putObjectCommand);
};

const deployFilesToS3 = async (s3Client, bucketName, rootDirectoryPath, filesPaths) => {
  const existingFilesKeys = await s3ListObjects(s3Client, bucketName);

  console.log('existingFilesKeys', existingFilesKeys.length, JSON.stringify(existingFilesKeys));

  const putFilesKeys = [];

  const putOperations = filesPaths.map((filePath) => {
    const fileKey = filePath.substring(rootDirectoryPath.length + 1);
    const data = fs.readFileSync(filePath);
    const contentType = mime.getType(filePath);

    putFilesKeys.push(fileKey);

    return s3PutObject(s3Client, bucketName, fileKey, data, contentType);
  });

  console.log('putFilesKeys', putFilesKeys.length, JSON.stringify(putFilesKeys));

  const deleteFilesKeys = existingFilesKeys.filter((fileKey) => !putFilesKeys.includes(fileKey));

  console.log('deleteFilesKeys', deleteFilesKeys.length, JSON.stringify(deleteFilesKeys));

  if (deleteFilesKeys.length === 0) {
    return Promise.all(putOperations);
  }

  const deleteOperation = s3DeleteObjects(s3Client, bucketName, deleteFilesKeys);

  return Promise.all([
    ...putOperations,
    deleteOperation,
  ]);
};

module.exports = deployFilesToS3;
