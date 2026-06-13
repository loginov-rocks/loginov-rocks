import path from 'node:path';

export default {
  devtool: false,
  entry: './src/index.ts',
  externals: [
    '@aws-sdk/client-cloudfront',
    '@aws-sdk/client-secrets-manager',
  ],
  externalsType: 'node-commonjs',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(import.meta.dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'node',
};
