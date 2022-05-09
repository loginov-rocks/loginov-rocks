import { tmpdir } from 'os';
import path from 'path';

import { GitHubData } from './src/Lib/GitHubData';

const pathsBase = process.env.LAMBDA_USE_TMPDIR === 'true' ? tmpdir() + '/' : '';

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const getGitHubData = new GitHubData({ url: 'https://loginov.rocks/github.json' });
    const gitHubData = await getGitHubData.get();

    return [
      {
        path: '/',
        getData: () => ({ gitHubData }),
      },
    ];
  },
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
