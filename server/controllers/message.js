const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;

const Socket = require('../models/socket-model.js');
const PrivateMsg = require('../models/private-msg-model.js'); 
const User = require('../models/user-model.js');
const Group = require('../models/group-model.js');
const GroupMsg = require('../models/group-msg-model.js');

module.exports = {
 
  // type: 'private' or 'group', to: 发送者昵称, _id: 发送目标对象的id 
  async newMessage (info, socket, cb, io) {
    const { type, user_id, to, content, toId } = info;
    let from = await User.findOne({ _id: user_id });
    if(type === 'private'){
      console.log('收到私聊', info)
      let target = await User.findOne({ _id: toId }).populate('socket','socket_id'),          
          newMsg = await new PrivateMsg({from: from._id, to: target._id, content});      
      if(target.onlineState) {
        let msg = {
          sender: from.nickname, createAt: newMsg.createAt, content,
          avatar: from.avatar, id: newMsg._id, type, from: from._id
        } 
        io.to(target.socket.socket_id).emit('new message', msg);        
      }
      await newMsg.save();
      return cb({ isError: false, msg: 'ok' });
    }
    else{
      console.log('收到群聊',info)
      let newMsg = await new GroupMsg({content, from: user_id, to: toId, createAt: new Date()}).save();     
      socket.broadcast.to(toId).emit('new message',{
        sender: from.nickname, createAt: newMsg.createAt, content,
        avatar: from.avatar, id: newMsg._id, type, from: toId
      });
      await Group.update({_id: toId}, {$set: {lastWord: content, lastWordTime: newMsg.createAt}});
      return cb({ isError: false, msg: 'ok' });
    }    
  },


  async getHistory (info, socket, cb) {
    const { user_id, type, to, _id } = info;
    console.log(user_id)
    if(type === 'private'){
      console.log('获私聊历史纪录', info)
      const target = await User.findOne({nickname: to});
      let historys = await PrivateMsg
          .find({$or: [{ 'from': user_id, 'to': target._id }, { 'to': user_id, 'from': target._id }]})
          .populate('from','avatar nickname')
          .sort({createAt: 1});
      historys = historys.map(item => ({
        sender: item.from.nickname,
        avatar: item.from.avatar,
        content: item.content,
        createAt: item.createAt,
        id: item._id
      }))
      return cb({isError: false, msg: {historys}});
    }else{
      let historys = await GroupMsg
        .find({to: _id})
        .populate('from', 'avatar nickname _id')
        .sort({createAt: 1})
      historys = historys.map(item => ({
        sender: item.from.nickname,
        avatar: item.from.avatar,
        content: item.content,
        createAt: item.createAt,
        id: item._id
      }));
      cb({isError: false, msg: {historys}})
    }    
  },
  
}
