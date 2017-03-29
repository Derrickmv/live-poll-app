// prod config
const path = require('path');
const webpack = require('webpack');

export default {
   devtool: 'source-map',

   entry: [
      './app-client.js',
   ],

   output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/public/'
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
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],

  module: {
    loaders: [{
         test: /\.js?$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
            presets: ['es2015', 'react']
         }
      }]
  }

}