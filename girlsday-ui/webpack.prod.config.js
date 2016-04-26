// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var helpers = require('./helpers');
// Webpack Plugins
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;

var metadata = {
  title: 'Provinzial Enterprise Search',
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV
};

/*
 * Config
 */
module.exports = helpers.validate({
  // static data for index.html
  metadata: metadata,

  devtool: 'source-map',
  cache: false,
  debug: false,

  entry: {
    'main': './src/main.tsx'
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  resolve: {
    cache: false,
    // ensure loader extensions match
    extensions: ['', '.ts', '.tsx', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: [
          /node_modules/,
          /dist/
        ]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      // Support for .ts files.
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // support for .html as raw text
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [
          helpers.root('src/index.html')
        ]
      },

      // Support bootstrap css
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
      { test: /\.tsx?$/, exclude: /(node_modules|bower_components)/, loader: 'ts' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },

  plugins: [
    new WebpackMd5Hash(),
    // static assets
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new DefinePlugin({
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    })
  ]
});
