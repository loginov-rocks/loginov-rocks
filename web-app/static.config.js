import os from 'os';
import path from 'path';

import { Document } from './static/components/Document';
import routes from './static/routes';
import getSiteData from './static/siteData';

const pathsBase = process.env.LAMBDA_USE_TMPDIR === 'true' ? `${os.tmpdir()}/` : '';

export default {
  Document,
  entry: path.resolve('./src/index.tsx'),
  getRoutes: routes.getRoutes(),
  getSiteData,
  paths: {
    buildArtifacts: `${pathsBase}artifacts`,
    dist: `${pathsBase}dist`,
    temp: `${pathsBase}tmp`,
  },
  plugins: [
    'react-static-plugin-css-modules',
    'react-static-plugin-reach-router',
    'react-static-plugin-sitemap',
    [
      'react-static-plugin-source-filesystem',
      {
        location: path.resolve('./src/pages'),
      },
    ],
    'react-static-plugin-typescript',
  ],
};
