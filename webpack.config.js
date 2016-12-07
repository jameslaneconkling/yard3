const webpack           = require('webpack');
const path              = require('path');
const validate          = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = 'localhost';
const PORT = 8080;
const PROD = process.env.NODE_ENV === 'production';

module.exports = validate({
  entry: PROD ?
    './src/index.js' :
    [
      ...(!PROD ? [`webpack-dev-server/client?http://${HOST}:${PORT}`] : []),
      ...(!PROD ? ['webpack/hot/only-dev-server'] : []),
      './example/index.jsx'
    ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: PROD ? 'umd' : undefined
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src'),
          ...(!PROD ? [path.join(__dirname, 'example')] : [])
        ],
        loaders: [
          ...(!PROD ? ['react-hot'] : []),
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
        loader: PROD ? ExtractTextPlugin.extract('style-loader', 'css-loader') : 'style-loader!css-loader',
        include: path.join(__dirname, 'example')
      },
      {
        test: /\.scss$/,
        loader: PROD ? ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap') : 'style-loader!css-loader!sass-loader?sourceMap',
        include: path.join(__dirname, 'example')
      }
    ]
  },

  plugins: [
    ...(!PROD ? [new HtmlWebpackPlugin({
      template: 'example/index.html'
    })] : []),
    ...(!PROD ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...(PROD ? [new ExtractTextPlugin('style.css')] : []),
    ...(PROD ? [new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    })] : [])
  ],

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
