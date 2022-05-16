/* eslint-disable import/no-import-module-exports */

import { S3Object } from './AWS/S3Object';

export * from './AWS/S3Object';
export * from './GitHub/GitHubData';
export * from './GitHub/GitHubRepo';
export * from './Home/HomeData';
export * from './Home/SocialPresenceItem';

exports.S3Object = S3Object;
