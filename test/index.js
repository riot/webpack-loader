const assert = require('assert'),
  fs = require('fs'),
  path = require('path'),
  loader = require('../index'),
  tagSource = fs.readFileSync(path.resolve(__dirname, './component.tag'), 'utf8')

const normalize = function(str) {
  return str.trim().replace(/[\n\r\s]+/g, '')
}

const normalTag = `
var riot = require('riot')
riot.tag2('component', '<p>{message}</p>', '', '', function(opts) {
  this.message = 'hi'
});`

const hotReloadTag = `
var riot = require('riot')
riot.tag2('component', '<p>{message}</p>', '', '', function(opts) {
  this.message = 'hi'
});
if (module.hot) {
  module.hot.accept()
  if (module.hot.data) {
    riot.reload('component')
  }
}`


describe('riot-tag-loader unit test', () => {
  it('riot loader default options', () => {
    const loaderContext = {}
    const compiledTag = loader.call(loaderContext, tagSource)
    assert.equal(normalize(compiledTag), normalize(normalTag))
  })

  it('riot loader hot reload options', () => {
    const loaderContext = {
      query: {
        hot: true
      }
    }
    const compiledTag = loader.call(loaderContext, tagSource)
    assert.equal(normalize(compiledTag), normalize(hotReloadTag))
  })
})
