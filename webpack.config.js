var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: "source-map",
	entry: [
		'./app-client.js'
	],
	output: {
		path: path.resolve('public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_HOST': 'https://dccr-dev01.herokuapp.com'
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