'use strict';

const {compile} = require('@riotjs/compiler');
const {getOptions} = require('loader-utils');

/**
 * Generate the hmr code depending on the tag generated by the compiler
 * @param   {string} tagName - name of the tag to reload
 * @returns {string} the code needed to handle the riot hot reload
 */
function hotReload(tagName) {
  return `
  if (module.hot) {
    const hotReload = require('@riotjs/hot-reload').default
    module.hot.accept()
    if (module.hot.data) {
      hotReload('${tagName}')
    }
  }`
}

module.exports = function(source) {
  // parse the user query
  const query = getOptions(this) || {};

  // normalise the query object in case of question marks
  const opts = Object.keys(query).reduce(function(acc, key) {
    acc[key.replace('?', '')] = query[key];
    return acc
  }, {});

  // compile and generate sourcemaps
  const {code, map, meta} = compile(
    source,
    {
      ...opts,
      file: this.resourcePath
    }
  );

  // generate the output code
  const output = `${code}${opts.hot ? hotReload(meta.tagName) : ''}`;

  // cache this module
  if (this.cacheable) this.cacheable();

  // return code and sourcemap
  this.callback(null, output, map);
};
