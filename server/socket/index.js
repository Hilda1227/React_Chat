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

    socket.on('login', (info, cb) => {
      user.login(info, socket, cb)
      .catch(err => cb({isError: true, errMsg: err}))
    });    
  
    socket.on('signUp', (info, cb) => {
      user.signUp(info, socket, cb)
      .catch(err => cb({isError: true, errMsg: err}))
    });

    socket.on('auto login', (info, cb) => {
      parsetoken(info)
      .then(() => user.autoLogin(info, socket, cb))
      .catch( err => console.log(err) )     
    })

    socket.on('disconnect', (info) => {
      user.disconnect(info, socket)
    });

    // 得到所有用户列表
    socket.on('getUsers', (info, cb) => {
      user.getUsers(info, socket, cb)
    })

    socket.on('new message', (info, cb) => {
      parsetoken(info)
      .then(() => message.newMessage(info, socket, cb, io))
      .catch( err => console.log(err) )     
    })

    socket.on('get history', (info, cb) => {
      parsetoken(info)
      .then(() => message.getHistory(info, socket, cb))
      .catch( err => console.log(err) )     
    })

  })
}



  