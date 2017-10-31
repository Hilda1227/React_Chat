var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: [path.resolve(__dirname, './src/index.js')],  
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-boundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', "stage-0"],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader?importloaders=1!postcss-loader' }, 
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
             }, 
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} 
        ]
    },
  
    plugins: [
      new htmlWebpackPlugin({
        template: './src/index.html', 
        filename: 'index.html',
        inject: 'body',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    ],
    devServer: {
        historyApiFallback: true
      }
}