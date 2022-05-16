const fs = require('fs');
const mime = require('mime');

// TODO: Use S3Object from the Shared package.
module.exports = (s3, bucketName, rootDirectoryPath, filesPaths) => (
  Promise.all(filesPaths.map((filePath) => (
    s3.putObject({
      Body: fs.readFileSync(filePath),
      Bucket: bucketName,
      ContentType: mime.getType(filePath),
      Key: filePath.substring(rootDirectoryPath.length + 1),
    }).promise()
  )))
);
