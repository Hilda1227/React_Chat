const jwt = require('jsonwebtoken');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;
const user = require('../controllers/user');
const message = require('../controllers/message');


function parsetoken (info) {
  return new Promise(function (resolve, reject){
    try{
      console.log('解析token',jwt.verify(info.token, SIGN_KEY))
      info.user_id = jwt.verify(info.token, SIGN_KEY).user_id;
    }catch(err){
      reject(err);
    }
    resolve(info);
  });
  
}

module.exports = function socket (io){ 
  io.sockets.on('connection', function (socket) {

    // 登录
    socket.on('login', (info, cb) => {
      user.login(info, socket, cb)
      .catch(err => cb({isError: true, errMsg: err}))
    });    
  
    // 注册
    socket.on('signUp', (info, cb) => {
      user.signUp(info, socket, cb)
      .catch(err => cb({isError: true, errMsg: err}))
    });

    // 自动登录
    socket.on('auto login', (info, cb) => {
      parsetoken(info)
      .then(() => user.autoLogin(info, socket, cb))
      .catch( err => console.log(err) )     
    })

    // 下线
    socket.on('disconnect', (info) => {
      user.disconnect(info, socket)
    });

    // 得到所有用户列表
    socket.on('get all users', (info, cb) => {
      user.getUsers(info, socket, cb)
    })

    // 查找该用户是否存在
    socket.on('find user', (info, cb) => {
      user.findUser(info, socket, cb)
    })

    // 发送新消息
    socket.on('new message', (info, cb) => {
      parsetoken(info)
      .then(() => message.newMessage(info, socket, cb, io))
      .catch( err => console.log(err) )     
    })

    // 聊天记录
    socket.on('get history', (info, cb) => {
      parsetoken(info)
      .then(() => message.getHistory(info, socket, cb))
      .catch( err => console.log(err) )     
    })

  })
}



  