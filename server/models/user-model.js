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
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'room'
  }],
  privates: [{
    type: Schema.Types.ObjectId,
    ref: 'user' 
  }],
  createAt: {
    type: Date,
    default: Date.now()
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
    type: Number,
    default: Date.now()
  }
});

module.exports = mongoose.model('user', userSchema);

