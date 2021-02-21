/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  devtool: false,
  entry: './src/index.ts',
  externals: {
    'aws-sdk': 'commonjs aws-sdk',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[j|t]s$/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      Constants: path.resolve(__dirname, 'src/Constants.ts'),
    },
    extensions: ['.js', '.ts'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
  },
  target: 'node',
};
