/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const http = require('https');

const WEB_APP_S3_GITHUB_FILE_KEY = 'github.json';
const WEB_APP_CLOUDFRONT_URL = 'https://loginov.rocks';

const DIST = './dist';

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST);
}

const file = fs.createWriteStream(`${DIST}/${WEB_APP_S3_GITHUB_FILE_KEY}`);

http.get(`${WEB_APP_CLOUDFRONT_URL}/${WEB_APP_S3_GITHUB_FILE_KEY}`, (response) => {
  response.pipe(file);
});
