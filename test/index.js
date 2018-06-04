const assert = require('assert'),
  webpack = require('webpack'),
  fs = require('fs'),
  path = require('path'),
  webpackConfig = require('./webpack.config'),
  { EXPECT, DUMMY_BUNDLE_NAME, DUMMY_BUNDLE_SOURCEMAP_NAME } = require('./config')

function normalize(str) {
  return str.trim().replace(/[\n\r]+/g, '')
}

function readFile(file) {
  return normalize(fs.readFileSync(path.join(EXPECT, file), 'utf8'))
}

function compile(opts) {
  webpackConfig.module.loaders[0].query = opts
  const compiler = webpack(webpackConfig)
  return new Promise(resolve => {
    compiler.run(function(err, stats) {
      assert.ifError(err)
      let content = normalize(stats.compilation.assets[DUMMY_BUNDLE_NAME].source())
      let sourceMap = normalize(stats.compilation.assets[DUMMY_BUNDLE_SOURCEMAP_NAME].source())
      resolve({
        content,
        sourceMap
      })
    })
  })
}

describe('riot-tag-loader unit test', () => {
  it('riot loader undefined options', (done) => {
    compile(undefined).then(({ content }) => {
      assert.equal(content, readFile('bundle-normal.js'))
      done()
    })
  })

  it('riot loader empty options', (done) => {
    compile({}).then(({ content }) => {
      assert.equal(content, readFile('bundle-normal.js'))
      done()
    })
  })

  it('riot loader hot reload options', (done) => {
    compile({
      hot: true
    }).then(({ content }) => {
      assert.equal(content, readFile('bundle-hot.js'))
      assert.ok(/riot\.reload\('component'\)/.test(content))
      done()
    })
  })

  it('riot loader hot reload options as string', (done) => {
    compile('hot=true').then(({ content }) => {
      assert.equal(content, readFile('bundle-hot.js'))
      done()
    })
  })

  it('riot loader hot reload options as string with question mark', (done) => {
    compile('?hot=true').then(({ content }) => {
      assert.equal(content, readFile('bundle-hot.js'))
      done()
    })
  })

  it('riot loader with disabled sourcemap options maps to compiled tag file', (done) => {
    compile({
      sourcemap: false
    }).then(({ content, sourceMap }) => {
      assert.equal(content, readFile('bundle-sourcemap-disabled.js'))
      assert.equal(sourceMap, readFile('bundle-sourcemap-disabled.js.map'))
      done()
    })
  })

  it('riot loader with enabled sourcemap options maps to original tag file', (done) => {
    compile({
      sourcemap: true
    }).then(({ content, sourceMap }) => {
      assert.equal(content, readFile('bundle-normal.js'))
      assert.equal(sourceMap, readFile('bundle-normal.js.map'))
      done()
    })
  })

  it('riot loader with undefined sourcemap options maps to original tag file', (done) => {
    compile({}).then(({ content, sourceMap }) => {
      assert.equal(content, readFile('bundle-normal.js'))
      assert.equal(sourceMap, readFile('bundle-normal.js.map'))
      done()
    })
  })

})
