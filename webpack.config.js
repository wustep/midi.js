const webpack = require('webpack')
const path = require('path')
const isBuild = !!process.env.BUILD || false

const libraryName = 'midi'

const plugins = {}
let outputFile

if (isBuild) {
  plugins['optimization'] = {minimize: true}
  outputFile = libraryName + '.min.js'
} else {
  outputFile = libraryName + '.js'
}

const config = {
  entry: {
    main: [__dirname + '/src/index.js']
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName.toUpperCase(),
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  mode: isBuild ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.js)$/,
        loader: "standard-loader",
        exclude: /node_modules/,
        options: {
          parser: 'babel-eslint',
          global: [ '__DEBUG__' ]
        }
      }
    ],
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.js']
  },
  ...plugins,
}

module.exports = config
