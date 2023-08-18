import { resolve, join } from 'node:path'
import { FIXTURES, DUMMY_BUNDLE_NAME } from './config.js'

console.log(resolve('./dist/riot-webpack-loader.cjs'))

export default {
  output: {
    path: resolve('./test'),
    filename: DUMMY_BUNDLE_NAME,
  },
  devtool: 'eval-source-map',
  entry: join(FIXTURES, 'index.js'),
  module: {
    rules: [
      {
        test: /\.riot$/,
        use: [
          {
            loader: resolve('./dist/riot-webpack-loader.js'),
          },
        ],
      },
    ],
  },
}
