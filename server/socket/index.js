const jwt = require('jsonwebtoken');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;
const user = require('../controllers/user');
const message = require('../controllers/message');
const group = require('../controllers/group');


function parsetoken (info) {
  return new Promise(function (resolve, reject){
    try{
      console.log('解析token',jwt.verify(info.token, SIGN_KEY))
      info.user_id = jwt.verify(info.token, SIGN_KEY).user_id;
    }catch(err){
      reject('token解析出错：',err);
    }
    console.log('解析出来的info：', info)
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
      .then(info => {console.log('传入的info',info);user.autoLogin(info, socket, cb)})
      .catch( err => console.log(err) )     
    })

    // 下线
    socket.on('disconnect', (info) => {
      user.disconnect(info, socket)
    });

    // 得到所有用户列表
    socket.on('get all users', (info, cb) => {
      user.getUsers(info, socket, cb)
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )
    })

    socket.on('fetch user info', (info, cb) => {
      user.fetchtUserInfo(info, socket, cb)
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )
    })

    // 查找该用户是否存在
    socket.on('find user', (info, cb) => {
      user.findUser(info, socket, cb)
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )
    })

    // 发送新消息
    socket.on('new message', (info, cb) => {
      parsetoken(info)
      .then(() => message.newMessage(info, socket, cb, io))
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    // 聊天记录
    socket.on('get private history', (info, cb) => {
      parsetoken(info)
      .then(() => message.getPrivateHistory(info, socket, cb))
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    socket.on('get group history', (info, cb) => {
      parsetoken(info)
      .then(() => message.getGroupHistory(info, socket, cb))
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    // 创建群组
    socket.on('create group', (info, cb) => {
      parsetoken(info)
      .then(() => group.createGroup(info, socket, cb))
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    // 加入群组
    socket.on('join group', (info, cb) => {
      parsetoken(info)
      .then(() => group.joinGroup(info, socket, cb))
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    // 退出群组
    socket.on('quit group', (info, cb) => {
      parsetoken(info)
      .then(() => group.quitGroup(info, socket, cb))
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    socket.on('init groups', (info, cb) => {
      group.initGroupList(info, socket, cb)
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    socket.on('search groups', (info, cb) => {
      group.searchGroup(info, socket, cb)
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

    socket.on('fetch group info', (info, cb) => {
      group.fetchtGroupInfo(info, socket, cb)
      .catch( err => { cb({isError: true, msg: '服务器好像凌乱了'}); console.log(err)} )     
    })

  })
}



  