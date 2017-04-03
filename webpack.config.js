var webpack = require('webpack');
var path = require('path');

module.exports = {
	debug: true,
	devtool: "#source-map",
	noInfo: false,
	entry: [
		'webpack-hot-middleware/client',
		'./app-client.js'
	],
	target: 'web',
	output: {
		path: path.resolve('public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
	],
	module: {
		loaders: [
			{
				test: /.js$/,
				exclude: /(node_modules)|app-server.js/,
				loader: 'babel-loader'
			}
		]
	}
};