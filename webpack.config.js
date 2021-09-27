const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const autoprefixer = require('autoprefixer')

const isDev = process.env.NODE_ENV === 'development' ? true : false
const filename = ext => isDev ? `[name]${ext}` : `[name].[hash]${ext}`

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: [
			'core-js/stable',
			'regenerator-runtime/runtime',
			'./index.js'
		],
	},
	output: {
		filename: filename('.js'),
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	resolve: {
		extensions: ['.js']
	},
	optimization: {
		minimizer: [
			new CssMinimizerPlugin({}),
			new TerserPlugin({})
		]
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		compress: true,
		port: 4200
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: filename('.css')
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/images/'),
					to: path.resolve(__dirname, 'dist/assets/images/')
				}
			]
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'autoprefixer',
										{
											overrideBrowserslist:[
												"last 4 version",
												"IE 11"
											]
										}
									]
								],
								sourceMap: true
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: `assets/images/${filename('')}[ext]`
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: `assets/fonts/${filename('')}[ext]`
				}
			},
			{
				test: /\.m?(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
}