const path = require('path');
const webpack = require('webpack');
// const PrettierPlugin = require("prettier-webpack-plugin");
const getPackageJson = require('./scripts/getPackageJson');

const {
	version,
	name,
	license,
	repository
} = getPackageJson('version', 'name', 'license', 'repository');

const banner = `${name} v${version}\n${repository.url}\n\n@copyright Eko (https://eko.in)\n@license ${license} found in the LICENSE file in the root directory.`;


module.exports = {
	mode: "production",
	entry: './src/aeps-gateway-lib.js',
	output: {
		filename: 'aeps-gateway-lib.js',
		path: path.resolve(__dirname, 'build'),
		library: 'EkoAEPSGateway',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					failOnError: true,
					failOnWarning: false
				},
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: { loader: 'babel-loader' },
			}
		]
	},
	plugins: [
		// new PrettierPlugin(),
		new webpack.BannerPlugin(banner)
	]
};