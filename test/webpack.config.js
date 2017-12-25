const path = require('path'),
  { FIXTURES, DUMMY_BUNDLE_NAME } = require('./config')

module.exports = {
  output: {
    path: __dirname,
    filename: DUMMY_BUNDLE_NAME
  },
  devtool: 'source-map',
  entry: path.join(FIXTURES, 'index.js'),
  externals: {
    riot: 'riot'
  },
  module: {
    loaders: [
      {
        test: /\.tag$/,
        loader: 'riot-tag-loader'
      }
    ]
  },
  resolveLoader: {
    alias: {
      'riot-tag-loader': path.resolve(__dirname, '../index.js')
    }
  }
}