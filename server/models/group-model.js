const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = mongoose.Schema({
  nickname: String,
  avatar: {
    type: String,
    default: 'http://oj7h98lzb.bkt.clouddn.com/download.svg'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lastWord: {
    type: String,
    default: '您已加入该群啦，一起来聊天吧~'
  },
  lastWordTime: {
    type: Date,
    default: new Date()
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  createAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('group', groupSchema);

