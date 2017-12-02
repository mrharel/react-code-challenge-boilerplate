const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function templateContent() {
  return fs.readFileSync(path.resolve(process.cwd(), 'src/client/index.html')).toString();
}

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    chunks: ['bundle'],
    templateContent: templateContent(), // eslint-disable-line no-use-before-define
  }),
];

module.exports = {
  devtool: 'eval-source-map',
  plugins,
  entry: {
    bundle: [
      path.resolve(process.cwd(), 'src/client/app/index.js'),
    ],
    worker: [
      path.resolve(process.cwd(), 'src/client/services/ads/worker.js'),
    ],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  target: 'web',
};
