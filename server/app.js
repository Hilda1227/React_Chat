const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors'); 
const body = require('koa-better-body');
const serve = require('koa-static-server');

const socket = require('./socket');

const db = require('./models/db');
const user = require('./routes/user');

const app =new Koa();

// 挂载socket.io
const server = require('http').Server(app.callback());
const io = require('socket.io').listen(server);
socket(io);

app.use(serve({rootDir: 'static/image/emoji', rootPath: '/chat/emoji'}));
app.use(serve({rootDir: 'static/image', rootPath: '/chat/img'}));

// 跨域
app.use(cors());  

// 解析post请求的body
app.use(bodyParser());


app.use(body())

// 注册路由
app.use(user);


// 监听3004端口
server.listen(3004, () => {
  console.log('正在监听3004端口...')
});



