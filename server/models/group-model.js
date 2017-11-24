const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = mongoose.Schema({
  nickname: String,
  avatar: {
    type: String,
    default: 'http://localhost:3004/chat/img/default_group_avatar.svg'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lastWord: {
    type: Schema.Types.ObjectId,
    ref: 'groupMsg'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  createAt: {
    type: Date,
    default: new Date()
  },
  describe: {
    type: String,
    default: '群主很懒，还没有群介绍哦~'
  }
});

module.exports = mongoose.model('group', groupSchema);

