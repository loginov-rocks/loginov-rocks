import { tmpdir } from 'os';
import path from 'path';

import routes from './routes';

const pathsBase = process.env.LAMBDA_USE_TMPDIR === 'true' ? tmpdir() + '/' : '';

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: routes.get(),
  paths: {
    buildArtifacts: pathsBase + 'artifacts',
    dist: pathsBase + 'dist',
    temp: pathsBase + 'tmp',
  },
  plugins: [
    'react-static-plugin-css-modules',
    'react-static-plugin-typescript',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
};
