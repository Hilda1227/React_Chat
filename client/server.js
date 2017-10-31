
var config = require("./webpack-dev-config");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

config.entry.unshift("webpack-dev-server/client?http://localhost:3002/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});
server.listen(3002);