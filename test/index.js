import { existsSync, readFileSync, unlinkSync } from 'fs'
import  { DUMMY_BUNDLE_NAME } from './config'
import {expect} from 'chai'
import { join } from 'path'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

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
      if (err) throw new Error(err)
      const { assets, outputPath } = stats.toJson()
      // these checks are only needed to the new Webpack 5
      // it has added some big breaking changes to its internal API
      const outputFile = join(outputPath, assets[0].name)
      const source = existsSync(outputFile) ?
        readFileSync(join(outputPath, assets[0].name), 'utf8') :
        stats.compilation.assets[DUMMY_BUNDLE_NAME].source()

      resolve(normalize(source))
    })
  })
}

const OPENING_TEMPLATE_CALL = /template\(/
const RIOT_HOT_RELOAD_DEPENDENCY = /hotReload/

describe('Riot.js webpack loader unit test', () => {
  afterEach(() => {
    const bundlePath = join(__dirname, DUMMY_BUNDLE_NAME)
    if (existsSync(bundlePath)) unlinkSync(bundlePath)
  })

  it('riot loader undefined options', async() => {
    const content = await compile(undefined)
    expect(OPENING_TEMPLATE_CALL.test(content)).to.be.ok
  })

  it('riot loader empty options', async() => {
    const content = await compile({})
    expect(OPENING_TEMPLATE_CALL.test(content)).to.be.ok
  })

  it('riot loader hot reload options', async() => {
    const content = await compile({
      hot: true,
      devtool: false
    })

    expect(OPENING_TEMPLATE_CALL.test(content)).to.be.ok
    expect(RIOT_HOT_RELOAD_DEPENDENCY.test(content)).to.be.ok
  })

  it('riot loader hot reload options as string', async() => {
    const content = await compile('hot=true')
    expect(OPENING_TEMPLATE_CALL.test(content)).to.be.ok
    expect(RIOT_HOT_RELOAD_DEPENDENCY.test(content)).to.be.ok
  })

  it('riot loader hot reload options as string with question mark', async() => {
    const content = await compile('?hot=true')

    expect(OPENING_TEMPLATE_CALL.test(content)).to.be.ok
    expect(RIOT_HOT_RELOAD_DEPENDENCY.test(content)).to.be.ok
  })

  it('riot loader with disabled sourcempas will not produce any inline sourcemap', async() => {
    const defaultOutput = (await compile())
    const content = await compile({
      sourcemap: false
    })

    expect(OPENING_TEMPLATE_CALL.test(content)).to.be.ok
    // the output here will be different
    expect(content).to.be.not.equal(defaultOutput)
  })
})
