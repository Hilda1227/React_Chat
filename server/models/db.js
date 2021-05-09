const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const initConfig = require('../config/init-config.js')
const Group = require('./group-model.js')
const User = require('./user-model.js');

(async function (params) {
  try {
    const db = await mongoose.connect('mongodb://localhost/chat-room', { useMongoClient: true })
  } catch (err) {
    console.log(`数据库连接失败...${err}`)
  }
  let auther = await User.findOne({ nickname: initConfig.AUTHER })
  if (!auther) {
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(initConfig.PASSWORD, salt)
    auther = await new User({ nickname: initConfig.AUTHER, password, email: initConfig.EMAIL })
    const initGroup = await new Group({ nickname: auther.nickname, creator: auther._id })
    auther.groups.push(initGroup._id)
    initGroup.members.push(auther._id)
    await auther.save(); await initGroup.save()
  }
})()
