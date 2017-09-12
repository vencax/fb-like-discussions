var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './examples/forum/js/main.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        // NOTE: you need modify exclude regexp when used in separate project
        // to allow babel to transpile!!!
        // E.g. /node_modules(?!\/react-mobx-admin)/
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'examples/forum'),
    filename: 'main.min.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
  ],
  // NOTE: needed coz' import like from a separate project are used in example
  // e.g.: import DataRequester from 'react-mobx-admin/services/requester'
  resolve: {
    alias: {
      'fb-like-comments': __dirname
    }
  }
}
