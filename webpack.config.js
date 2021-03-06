/*eslint-disable */

const path = require('path');
const include = path.resolve(__dirname, 'src')
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    library: '$savana',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './view'),
  },
  devtool: 'source-map',
  module: {
    loaders: [
       {test: /\.js$/, loader: 'babel-loader', include},
    ]
  }
};
