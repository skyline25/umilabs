const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')
const autoprefixer = require('autoprefixer')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ExtractTextPlugin('styles.min.css'),
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, 
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }, 
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            },
          ]
        })
      },
    ]
  },
})