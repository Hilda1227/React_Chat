const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;

const User = require('../models/user-model.js');
const Socket = require('../models/socket-model.js');
const PrivateMsg = require('../models/private-msg-model.js') 

module.exports = {

  async newMessage (info, socket, cb, io) {
    console.log('调用newMessage')
    const { type, user_id, to, content } = info;
    // if(type === 'private'){
      const target = await User.findOne({ nickname: to }).populate('socket','socket_id'),
            from = await User.findOne({ _id: user_id });
      const newMsg = await new PrivateMsg({from: from._id, to: target._id, content});
      console.log(user_id)
      console.log(from)
      console.log(from.nickname)
      const msg = {
        from: from.nickname, 
        createAt: newMsg.createAt,
        content: content,
        avatar: from.avatar,
        id: newMsg._id
      }
      if(target.onlineState) io.to(target.socket.socket_id).emit('new message', msg);
      await newMsg.save();
      return cb({ isError: false, msg: 'ok' });
    // }    
  },

  async getHistory (info, socket, cb) {
    console.log('调用getHistory');
    const { user_id, type, to } = info;
    console.log(user_id)
    const target = await User.findOne({nickname: to});
    let historys = await PrivateMsg.find({$or: [{ 'from': user_id, 'to': target._id }, { 'to': user_id, 'from': target._id }]})
                  .populate('from','avatar nickname').sort({createAt: 1});
    console.log('总和',historys)
    historys = historys.map(item => ({
      from: item.from.nickname,
      avatar: item.from.avatar,
      content: item.content,
      createAt: item.createAt,
      id: item._id
    }))
    return cb({isError: false, msg: {historys}});
  },
  
}