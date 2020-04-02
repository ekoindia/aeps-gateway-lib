const path = require('path');
const webpack = require('webpack');
// const PrettierPlugin = require("prettier-webpack-plugin");
const getPackageJson = require('./scripts/getPackageJson');

const {
	version,
	name,
	license,
	repository,
	author,
} = getPackageJson('version', 'name', 'license', 'repository', 'author');

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
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: { loader: 'babel-loader' }
			}
		]
	},
	plugins: [
		// new PrettierPlugin(),
		new webpack.BannerPlugin(banner)
	]
};