# Riot.js webpack-loader

[![Build Status][ci-image]][ci-url]
[![Issue Count][qlty-image]][qlty-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Riot.js official webpack loader

## Important

If you are using Riot.js < 4.0.0 please check the [v3 branch](https://github.com/riot/webpack-loader/tree/v3)

## Installation

```shell
npm i @riotjs/webpack-loader @riotjs/compiler -D
```

## Usage

Add the `@riotjs/webpack-loader` in your `webpack.config.js` file

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
            options: {
              hot: false, // set it to true if you are using hmr
              // add here all the other @riotjs/compiler options riot.js.org/compiler
              // template: 'pug' for example
            },
          },
        ],
      },
    ],
  },
}
```

If you want to enable hmr via `hot` option you will need to install also [`@riotjs/hot-reload`](https://www.npmjs.com/package/@riotjs/hot-reload)

```shell
npm i @riotjs/hot-reload -D
```

And afterward webpack will be able to automatically reload your Riot.js components in runtime.

## Examples

Please check the following exapmles to see how it's easy to configure webpack with riot:

- [Lazy routes](https://github.com/riot/examples/tree/gh-pages/lazy-routes)
- [SSR](https://github.com/riot/examples/tree/gh-pages/ssr)

[ci-image]: https://img.shields.io/github/actions/workflow/status/riot/webpack-loader/test.yml?style=flat-square
[ci-url]: https://github.com/riot/webpack-loader/actions
[license-image]: https://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: https://img.shields.io/npm/v/@riotjs/webpack-loader.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/@riotjs/webpack-loader.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@riotjs/webpack-loader
[qlty-image]: https://qlty.sh/gh/riot/projects/webpack-loader/maintainability.svg
[qlty-url]: https://qlty.sh/gh/riot/projects/webpack-loader
