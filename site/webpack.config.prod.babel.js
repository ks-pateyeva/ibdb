import '@babel/polyfill';

import path from 'path';

import webpack from 'webpack';

import CopyWebpackPlugin from 'copy-webpack-plugin';
//import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import ImageMinPlugin from 'imagemin-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import autoprefixer from 'autoprefixer';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: false,
  entry: {
    main: [
      '@babel/polyfill',
      './src/app/index.js',
      'bootstrap/dist/css/bootstrap.min.css',
      'react-datepicker/dist/react-datepicker.css'
    ],
    bundle: ['jquery', 'popper.js', 'bootstrap'],
  },
  output: {
    path: path.join(__dirname, '../InternetBookDatabase/InternetBookDatabase/wwwroot'),
    filename: `[name].[hash].js`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
          },
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer,
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
			logger: [ path.resolve(path.join(__dirname, '/logger.js')), 'default' ],
      //adapter: ['webrtc-adapter', 'default'],
    }),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
    ]),
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[name].js.map',
    //   exclude: ['bundle.js'],
    // }),
    new CleanWebpackPlugin() ,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // new HtmlWebpackPlugin({
    //   filename: './index.html',
    //   template: './src/index.html',
    // }),
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({ sourceMap: true }),
      new ImageMinPlugin({
        test: /\.(png|jpe?g|gif|svg)$/,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { sourceMap: true },
      }),
    ],
  },
};