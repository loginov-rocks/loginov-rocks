const fs = require('fs');

module.exports = (s3, bucketName, rootDirectoryPath, filesPaths) => (
  Promise.all(filesPaths.map((filePath) => (
    s3.putObject({
      Body: fs.readFileSync(filePath),
      Bucket: bucketName,
      Key: filePath.substring(rootDirectoryPath.length + 1),
    }).promise()
  )))
);
