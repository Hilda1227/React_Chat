const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;

const Socket = require('../models/socket-model.js');
const PrivateMsg = require('../models/private-msg-model.js'); 
const User = require('../models/user-model.js');
const Group = require('../models/group-model.js');
const GroupMsg = require('../models/group-msg-model.js');

module.exports = {
 
  // type: 'private' or 'group', toId: 发送目标对象的id 
  async newMessage (info, socket, cb, io) {
    const { type, user_id, content, toId, msgType} = info;
    let from = await User.findOne({ _id: user_id });
    if(type === 'private'){
      let target = await User.findOne({ _id: toId }).populate('socket','socket_id'),          
          newMsg = await new PrivateMsg({from: from._id, to: target._id, content, msgType, createAt: Date.now()});      
      if(target.onlineState) {
        let msg = {
          sender: from.nickname, createAt: newMsg.createAt, content,
          avatar: from.avatar, _id: newMsg._id, type, from: from._id, msgType
        } 
        io.to(target.socket.socket_id).emit('new message', msg);        
      }
      await newMsg.save();
      return cb({ isError: false, msg: {_id: newMsg._id} });
    }
    else{
      console.log('收到群聊',info)
      let newMsg = await new GroupMsg({content, from: user_id, to: toId, msgType, createAt: Date.now()}).save();     
      socket.broadcast.to(toId).emit('new message',{
        sender: from.nickname, createAt: newMsg.createAt, content,
        avatar: from.avatar, _id: newMsg._id, type, from: toId, msgType
      });
      await Group.update({_id: toId}, {$set: {lastWord: newMsg._id}});
      return cb({ isError: false, msg: {_id: newMsg._id} });
    }    
  },
  
  // _id为聊天对象的_id
  async getPrivateHistory (info, socket, cb) {
    const { user_id, to, _id, timestamp, limit } = info;
    let historys = await PrivateMsg
        .find({
          $or: [{ 'from': user_id, 'to': _id }, { 'to': user_id, 'from': _id }],
          createAt: {$lt: timestamp}
        })
        .sort({'_id': -1})
        .limit(limit)
        .populate('from','avatar nickname');
    historys = historys.map(item => ({
      sender: item.from.nickname,
      avatar: item.from.avatar,
      content: item.content,
      createAt: item.createAt,
      _id: item._id,
      msgType: item.msgType
    }));
    historys.reverse();
    return cb({isError: false, msg: {historys}});
  },

  async getGroupHistory (info, socket, cb) {
    const { user_id, to, _id, timestamp, limit } = info;
    let historys = await GroupMsg
    .find({
      to: _id,
      createAt: {$lt: timestamp}
    })
    .sort({'_id': -1})
    .limit(limit)
    .populate('from', 'avatar nickname _id');   
    historys = historys.map(item => ({
      sender: item.from.nickname,
      avatar: item.from.avatar,
      content: item.content,
      createAt: item.createAt,
      _id: item._id,
      msgType: item.msgType
    }));
    historys.reverse();
    cb({isError: false, msg: {historys}});
  }
}


