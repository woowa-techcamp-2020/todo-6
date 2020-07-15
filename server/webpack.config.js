const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    main: './src/public/scripts/app.js'
  },
  output: {
    path: path.resolve('./dist/public/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
            publicPath: '../public/scripts'

          }
        }]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: './src/views/mainPage.html',
    filename: '../../views/mainPage.html'
  }),
  new CleanWebpackPlugin(),
]
};