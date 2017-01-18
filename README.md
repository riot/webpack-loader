# tag-loader

Riot official webpack loader

## Usage

Add the riot-tag-loader in your `webpack.config.js` file
```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
          hot: false, // set it to true if you are using hmr
          debug: false // set it to true to enable sourcemaps debugging
          // add here all the other riot-compiler options riotjs.com/guide/compiler/
          // template: 'pug' for example
        }
      }
    ]
  }
}
```
