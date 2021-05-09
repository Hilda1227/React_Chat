
const config = require('./webpack-dev-config')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

config.entry.unshift('webpack-dev-server/client?http://localhost:3002/')

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
})
server.listen(3002)
