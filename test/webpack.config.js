const path = require('path'),
  { FIXTURES, DUMMY_BUNDLE_NAME } = require('./config')

module.exports = {
  output: {
    path: __dirname,
    filename: DUMMY_BUNDLE_NAME
  },
  devtool: 'eval-source-map',
  entry: path.join(FIXTURES, 'index.js'),
  module: {
    rules: [
      {
        test: /\.riot$/,
        use: [{
          loader: path.resolve(__dirname, '../dist/riot-webpack-loader.cjs.js')
        }]
      }
    ]
  }
}