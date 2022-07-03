/* eslint-disable import/no-import-module-exports */

import { CloudFrontInvalidation } from './AWS/CloudFrontInvalidation';
import { KeyValueSecret } from './AWS/KeyValueSecret';
import { S3Object } from './AWS/S3Object';

// Export types.
export * from './AWS/CloudFrontInvalidation';
export * from './AWS/KeyValueSecret';
export * from './AWS/S3Object';
export * from './GitHub/GitHubData';
export * from './GitHub/GitHubRepo';

// Export implementation.
exports.CloudFrontInvalidation = CloudFrontInvalidation;
exports.KeyValueSecret = KeyValueSecret;
exports.S3Object = S3Object;
