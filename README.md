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

If you want to enable hmr you will need to install [`riot-hot-reload`](https://www.npmjs.com/package/riot-hot-reload)

```shell
npm i riot-hot-reload -D
```

And afterwards you should import it the `riot-hot-reload` (only once in your bootstrap file) in your project in order to enhance the default riot api

```js
import riot from 'riot'
import 'riot-hot-reload'

// riot will have now a new riot.reload method!!
```
