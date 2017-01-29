const assert = require('assert'),
  webpack = require('webpack'),
  fs = require('fs'),
  path = require('path'),
  webpackConfig = require('./webpack.config'),
  { EXPECT, DUMMY_BUNDLE_NAME } = require('./config')

function normalize(str) {
  return str.trim().replace(/[\n\r]+/g, '')
}

function readFile(file) {
  return normalize(fs.readFileSync(path.join(EXPECT, file), 'utf8'))
}

function compile(opts = {}) {
  webpackConfig.module.loaders[0].query = opts
  const compiler = webpack(webpackConfig)
  return new Promise(resolve => {
    compiler.run(function(err, stats) {
      assert.ifError(err)
      resolve(normalize(stats.compilation.assets[DUMMY_BUNDLE_NAME].source()))
    })
  })
}

describe('riot-tag-loader unit test', () => {
  it('riot loader default options', (done) => {
    compile().then(content => {
      assert.equal(content, readFile('bundle-normal.js'))
      done()
    })
  })

  it('riot loader hot reload options', (done) => {
    compile({
      hot: true
    }).then(content => {
      assert.equal(content, readFile('bundle-hot.js'))
      done()
    })
  })
})
