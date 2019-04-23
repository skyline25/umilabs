const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Extract CSS
const extractCSS = new ExtractTextPlugin('../styles/styles.min.css');

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    // publicPath: 'dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ])
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    extractCSS
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    stats: 'errors-only'
  }
}

module.exports = config;