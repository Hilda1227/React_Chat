const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;
const initConfig = require('../config/init-config.js');
const User = require('../models/user-model.js');
const Socket = require('../models/socket-model.js');
const Group = require('../models/group-model.js');
const PrivateMsg = require('../models/private-msg-model.js'); 

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
      socket.broadcast.emit('online',{_id: user._id, nickname: user.nickname});
      return cb({ isError: false, msg: { token, user } });
    }
    return cb({ isError: true, msg: '密码错误'});
  },


  async autoLogin (info, socket, cb) {
    const {user_id} = info;
    let user = await User.findOne({ _id: user_id });
    console.log('user_id: ', user_id);
    console.log('user: ', user)
    if(user) {      
      sock = new Socket({ user: user._id, socket_id: socket.id }); 
      user.socket = sock._id; user.onlineState = true;
      await user.save(); await sock.save();
      socket.broadcast.emit('online',{_id: user._id, nickname: user.nickname});
      return cb({isError: false, msg: {user}});
    }
    return cb({isError: true, msg: 'token登录失败'})
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
        sock = await new Socket({user: user._id, socket_id: socket.id}).save(),
        exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30,
        token = await jwt.sign({ user_id: user._id, exp }, SIGN_KEY); 
    user.socket = sock._id; user.onlineState = true;
    
    let initGroup = await Group.findOne({nickname: initConfig.AUTHER});
    console.log('这里'+user, token, "这是group"+initGroup);
    user.groups.push(initGroup._id); initGroup.members.push(user._id);
    
    await user.save();  await initGroup.save();
    return cb({ isError: false, msg: {token, user} });
  },
  

  async disconnect (info, socket, cb) {
    let online = await Socket.findOne({socket_id:socket.id}).populate('user','_id nickname');
    if(online){
      var user = User.update({_id: online.user._id},{$set: {
        onlineState: false,
        lastOnline: new Date(),
      }});
      let sock = Socket.remove({socket_id: socket.id});
      await sock; await user;
      socket.broadcast.emit('offline',{_id: online.user._id, nickname: online.user.nickname});
      console.log(`--------------------${online.user.nickname}下线了`);
    }
  },


  async findUser (info, socket, cb) {
    let { nickname, user_id } = info;
    let user = await User.findOne({ nickname });
    if(user) {
      let historys = await PrivateMsg
      .find({$or: [{ 'from': user_id, 'to': user._id }, { 'to': user_id, 'from': user._id }]})
      .populate('from', 'nickname')
      .sort({createAt: 1});
      user = {
        _id: user._id, avatar: user.avatar, nickname: user.nickname
      }
      if(historys.length !== 0){
        let last = historys[historys.length - 1];
        user.msgType = last.msgType;
        user.lastWord = last.content; 
        user.lastWordSender = last.from.nickname; 
        user.lastWordTime = last.createAt;
      }
      return cb({ isError: false, msg: {user} });
    }
    return cb({ isError: true, msg: '不存在此用户' });     
  },
  
  
  async getUsers (info, socket, cb) {
    const users = await User.find({});
    return cb({isError: false, msg: {users} });
  },


}


