const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config/init-config.js')

const groupSchema = mongoose.Schema({
  nickname: String,
  avatar: {
    type: String,
    default: config.DEFAULT_GROUP_AVATAR
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
  // 禁言
  block: [{
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
})

module.exports = mongoose.model('group', groupSchema)
