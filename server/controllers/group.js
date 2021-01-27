const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY

const User = require('../models/user-model.js')
const Socket = require('../models/socket-model.js')
const PrivateMsg = require('../models/private-msg-model.js')
const Group = require('../models/group-model.js')

module.exports = {

  async searchGroup (info, socket, cb) {
    const groups = await Group.find({ nickname: eval('/.*' + info.key + '.*/i') })
    cb({ isError: false, msg: { groups } })
  },

  async fetchtGroupInfo (info, socket, cb) {
    const group = await Group.findOne({ _id: info._id })
    const admin = await User.findOne({ _id: String(group.creator) })
    if (Group) {
      const info = {
        nickname: group.nickname,
        avatar: group.avatar,
        creator: admin,
        count: group.members.length,
        createAt: group.createAt,
        describe: group.describe
      }
      return cb({ isError: false, msg: { info } })
    }
    cb({ isError: true, msg: '不存在此用户' })
  },

  // @param {object} info  user_id(用户id) & nickname(所要加入的群组昵称)
  async joinGroup (info, socket, cb) {
    const group = await Group.findOne({ _id: info._id })
    if (group) {
      user = await User.findOne({ _id: info.user_id })
      if (user &&
        user.groups.indexOf(group._id) !== -1 ||
        group.members.indexOf(info.user_id) !== -1
      ) {
        return cb({ isError: true, msg: '您已在该房间' })
      } else {
        user.groups.push(group._id)
        group.members.push(user._id)
        await user.save(); await group.save()
        socket.join(group._id)
        cb({
          isError: false,
          msg: {
            group:
          {
            avatar: group.avatar,
            _id: group._id,
            nickname: group.nickname,
            type: 'group'
          }
          }
        }); return
      }
    }
    return cb({ isError: true, msg: '不存在该群组' })
  },

  // @param {object} info  user_id(用户id) & group_id(所要退出的群组id)
  async quitGroup (info, socket, cb) {
    const group = await Group.findOne({ _id: info.group_id })
    const user = await User.findOne({ _id: info.user_id })
    let index = user.groups.indexOf(group._id)
    if (index !== -1) {
      user.groups.splice(index, 1)
      index = group.members.indexOf(user._id);
      (index !== -1) && group.members.splice(index, 1)
      socket.leave(info.group_id)
      await user.save(); await group.save()
      cb({ isError: false, msg: '已成功退出' })
    }
    cb({ isError: true, msg: '您已不在该群' })
  },

  // @param {object} info   _id(用户id)
  async initGroupList (info, socket, cb) {
    const userGroups = await User.findOne({ _id: info._id || info.user_id })
      .populate({
        path: 'groups',
        select: 'avatar nickname _id lastWord lastWordTime',
        populate: {
          path: 'lastWord',
          select: 'content createAt from msgType',
          populate: { path: 'from', select: 'nickname' }
        }
      })
    if (userGroups) {
      const groups = userGroups.groups.map(item => {
        socket.join(item._id)
        const group = { avatar: item.avatar, _id: item._id, nickname: item.nickname, type: 'group' }
        if (item.lastWord) {
          group.lastWord = item.lastWord.content
          group.msgType = item.lastWord.msgType
          group.lastWordTime = item.lastWord.createAt
          group.lastWordSender = item.lastWord.from.nickname
        }
        return group
      })
      return cb({ isError: false, msg: { groups } })
    }
    return cb({ isError: true, msg: '服务器好像凌乱了' })
  },

  async mergeMembers (info, socket, cb) {
    const group = await Group.findOne({ _id: info.group_id })

    const promise = group.members.map(async item => {
      const user = await User.findOne({ _id: item })
      return { ...user._doc, blocked: group.block.indexOf(user._id) !== -1 }
    })
    Promise.all(promise).then(members => {
      return cb({ isError: false, msg: { members } })
    })
  },

  async blockTalking (info, socket, cb) {
    const { user_id, group_id, m_id } = info
    const group = await Group.findOne({ _id: group_id })
    if (String(group.creator) !== user_id) {
      return cb({ isError: true, msg: '权限不足' })
    } else if (group.block.indexOf(m_id) !== -1) {
      return cb({ isError: true, msg: '已禁言' })
    } else {
      group.block.push(m_id)
      await group.save()
      cb({ isError: false, msg: '已禁言' })
    }
  },

  async relieveBlock (info, socket, cb) {
    const { user_id, group_id, m_id } = info
    const group = await Group.findOne({ _id: group_id })
    if (String(group.creator) !== user_id) {
      cb({ isError: true, msg: '权限不足' })
    } else {
      const index = Array.from(group.block).indexOf(m_id)
      group.block.splice(index, 1)
      await group.save()
      cb({ isError: false, msg: '禁言已解除' })
    }
  },

  async removeMember (info, socket, cb) {
    const { user_id, group_id, m_id } = info
    const group = await Group.findOne({ _id: group_id })
    const user = await User.findOne({ _id: user_id })
    const member = await User.findOne({ _id: m_id })
    if (String(group.creator) !== user_id) {
      cb({ isError: true, msg: '权限不足' })
    } else {
      let index = group.members.indexOf(m_id)
      group.members.splice(index, 1)
      await group.save()
      index = member.groups.indexOf(group_id)
      member.groups.splice(index, 1)
      await member.save()
      cb({ isError: false, msg: '已移出该群' })
    }
  }
}
