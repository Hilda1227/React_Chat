var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var proxy = require('http-proxy-middleware')

module.exports = {
    // 打包的入口文件
    entry: [path.resolve(__dirname, './src/index.js')],  
    // 打包后新生成的文件路径和名称
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-boundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js|\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0', 'stage-1'],
                    plugins: ["transform-decorators-legacy"]
                    
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader?importloaders=1!postcss-loader' }, 
            //打包css文件
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
             }, 
            //编译sass文件
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'img/[name].[hash:7].[ext]'
                }
              },
            //对图片进行打包
        ]
    },
    resolve:{
        extensions:['.css','.js','.jsx']
    },
    plugins: [
      new htmlWebpackPlugin({
        template: './src/index.html', 
        filename: 'index.html',
        inject: 'body',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
    ],
    devServer: {
        historyApiFallback: true,
      }
}