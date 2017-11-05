const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;
const User = require('../models/user-model.js');
const Socket = require('../models/socket-model.js');

module.exports = {

  async login (info, socket, cb) {
    let { email, password } = info;
    let user = await User.findOne({ email: email });
    if(!user) {
      user = await User.findOne({ nickname: email });
      if(!user)
        return cb({ isError: true, msg: '不存在该用户'});
    }
    if(bcrypt.compareSync( password, user.password)) {
        // 将该在线用户保存进socket集合
      sock = new Socket({ user: user._id, socket_id: socket.id }); 
      user.socket = sock._id; user.onlineState = true;
      user.save(); sock.save();
      // 生成token返回给客户端
      exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30;
      token = await jwt.sign({ user_id: user._id, exp }, SIGN_KEY);
      return cb({ isError: false, msg: { token, user } });
    }
    return cb({ isError: true, msg: '密码错误'});
  },


  async signUp (info, socket, cb) {
    let { nickname, email, password } = info,
        repnickname = await User.find({nickname: nickname}),
        repemail = await User.find({email: email});
    if(repnickname.length || repemail.length) {
      return cb({ isError: true, msg: '用户已存在' }); 
    }
    // password加密
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    // 新建该用户实例
    let user = new User ({ nickname, email, password }),
        sock = new Socket({user: user._id, socket_id: socket.id}),
        exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30,
        token = await jwt.sign({ user: user._id, exp }, SIGN_KEY); 
    user.socket = sock._id; user.onlineState = true; user.save(); 
    sock.save(); return cb({ isError: false, msg: {token, user} });
  },


  async disconnect (info, socket, cb) {
    let online = await Socket.findOne({socket_id:socket.id}).populate('user','_id nickname');
    if(online){
      let user = User.update({_id: online.user._id},{$set: {
        onlineState: false,
        lastOnline: Date.now(),
      }});
      let sock = Socket.remove({socket_id: socket.id});
      await sock; await user;
      socket.broadcast.emit('disconnect',{msg: `${online.user.nickname}下线了`});
      console.log(`--------------------${online.user.nickname}下线了`);
    }
  },

  
  async getUsers (info, socket, cb) {
    const users = await User.find({});
    return cb({isError: false, msg: {users} });
  },


}


