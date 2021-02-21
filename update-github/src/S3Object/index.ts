import { S3_BUCKET, S3_KEY } from 'Constants';

import { S3Object } from './S3Object';

const instance = new S3Object({ bucket: S3_BUCKET, key: S3_KEY });

export default instance;
