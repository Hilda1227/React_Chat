const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  nickname: String,
  email: String,
  password: String,
  sex: {
    type: String,
    default: '秘密'
  },
  avatar: {
    type: String, 
    default: 'https://cdn.dribbble.com/users/35381/screenshots/3118843/wut.png'
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'group'
  }],
  // 私聊过的人
  // privates: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'user' 
  // }],
  createAt: {
    type: Date,
    default: new Date()
  },
  socket: {
    type: Schema.Types.ObjectId,
    ref: 'socket'
  },
  onlineState:{
    type: Boolean,
    default: true
  },
  lastOnline: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('user', userSchema);

