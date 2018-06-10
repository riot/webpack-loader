const assert = require('assert'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config'),
  { DUMMY_BUNDLE_NAME } = require('./config')

function normalize(str) {
  return str.trim().replace(/[\n\r]+/g, '')
}


function compile(opts) {
  webpackConfig.module.rules[0].use[0].options = opts

  if (opts && opts.hot) {
    webpackConfig.plugins = [
      new webpack.HotModuleReplacementPlugin()
    ]
  }

  const compiler = webpack(webpackConfig)
  return new Promise(resolve => {
    compiler.run(function(err, stats) {
      assert.ifError(err)
      resolve(normalize(stats.compilation.assets[DUMMY_BUNDLE_NAME].source()))
    })
  })
}

const TEST_TAG_RE = /\.tag2\(['|"]component['|"]/
const RELOAD_TAG_RE = /\.reload\(['|"]component['|"]\)/

describe('riot-tag-loader unit test', () => {
  it('riot loader undefined options', async() => {
    const content = await compile(undefined)
    assert.ok(TEST_TAG_RE.test(content))
  })

  it('riot loader empty options', async() => {
    const content = await compile({})
    assert.ok(TEST_TAG_RE.test(content))
  })

  it('riot loader hot reload options', async() => {
    const content = await compile({
      hot: true
    })

    assert.ok(TEST_TAG_RE.test(content))
    assert.ok(RELOAD_TAG_RE.test(content))
  })

  it('riot loader hot reload options as string', async() => {
    const content = await compile('hot=true')
    assert.ok(TEST_TAG_RE.test(content))
    assert.ok(RELOAD_TAG_RE.test(content))
  })

  it('riot loader hot reload options as string with question mark', async() => {
    const content = await compile('?hot=true')

    assert.ok(TEST_TAG_RE.test(content))
    assert.ok(RELOAD_TAG_RE.test(content))
  })

  it('riot loader with disabled sourcemap options maps to compiled tag file', async() => {
    const defaultOutput = (await compile())
    const content = await compile({
      sourcemap: false
    })

    assert.ok(TEST_TAG_RE.test(content))
    // the output here will be different
    assert.notEqual(content, defaultOutput)
  })

  it('riot loader with enabled sourcemap options maps to original tag file', async() => {
    const defaultOutput = (await compile())
    const content = await compile({
      sourcemap: true
    })

    assert.ok(TEST_TAG_RE.test(content))
    assert.equal(defaultOutput, content)
  })

  it('riot loader with undefined sourcemap options maps to original tag file', async() => {
    const defaultOutput = (await compile())
    const content = await compile({})

    assert.ok(TEST_TAG_RE.test(content))
    assert.equal(content, defaultOutput)
  })
})
