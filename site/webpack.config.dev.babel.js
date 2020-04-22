import '@babel/polyfill';

// eslint-disable-next-line no-unused-vars
import path from 'path';

import webpack from 'webpack';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

module.exports = {
	devtool: false,
	entry: {
		main: [
			'@babel/polyfill',
			'./src/app/index.js',
			'bootstrap/dist/css/bootstrap.min.css',
		],
		bundle: ['jquery', 'popper.js', 'bootstrap'],
	},
	output: {
		filename: '[name].js',
	},
	devServer: {
		historyApiFallback: true,
		port: 3000,
		hot: true,
	},
	module: {
		rules: [{
				test: /\.(jsx?)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/react'],
						cacheDirectory: true,
						plugins: ['react-hot-loader/babel'],
					},
				}],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						},
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
						options: {
							sourceMap: true
						},
					},
				],
			},
			{
				test: /\.(png|gif|jpe?g)$/,
				use: [{
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
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
			}
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				devServer: true
			},
			'process.api': {
				url: `'http://localhost:5000/'`,
			},
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: [ 'popper.js', 'default' ],
			logger: [ path.resolve(path.join(__dirname, '/logger.js')), 'default' ],
		}),
		new CopyWebpackPlugin([{
			from: 'src/img',
			to: 'img'
		}, ]),
		new webpack.SourceMapDevToolPlugin({
			filename: '[name].js.map',
			exclude: ['bundle.js'],
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/index.html',
		}),
	],
};