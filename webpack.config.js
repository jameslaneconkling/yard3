/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-multi-spaces */
const webpack           = require('webpack');
const path              = require('path');
const validate          = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = 'localhost';
const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === 'production';

const entry = PROD ?
  './src/index.js' :
  [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './example/index.jsx'
  ];

const loaders = PROD ?
  [
    {
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loaders: ['babel']
    }
  ] :
  [
    {
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'example')
      ],
      loaders: [
        'react-hot',
        'babel'
      ]
    },
    {
      test: /\.json$/,
      include: path.join(__dirname, 'example'),
      loader: 'json'
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: path.join(__dirname, 'example')
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader?sourceMap',
      include: path.join(__dirname, 'example')
    },
    // {
    //   test: /\.svg/,
    //   loader: 'svg-url-loader'
    // }
  ];

const plugins = PROD ?
  [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    })
  ] :
  [
    new HtmlWebpackPlugin({ template: 'example/index.html' }),
    new webpack.HotModuleReplacementPlugin()
  ];



module.exports = validate({
  entry,

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: PROD ? 'umd' : undefined
  },

  module: {
    loaders
  },

  plugins,

  devtool: PROD ? 'source-map' : 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: HOST,
    port: PORT
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
});
