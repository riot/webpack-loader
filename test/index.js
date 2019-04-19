import  { DUMMY_BUNDLE_NAME } from './config'
import {expect} from 'chai'
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
      resolve(normalize(stats.compilation.assets[DUMMY_BUNDLE_NAME].source()))
    })
  })
}

const OPENING_TEMPLATE_CALL = /template\(/
const RIOT_HOT_RELOAD_DEPENDENCY = /hotReload/

describe('Riot.js webpack loader unit test', () => {
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
