const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;

const User = require('../models/user-model.js');
const Socket = require('../models/socket-model.js');
const PrivateMsg = require('../models/private-msg-model.js'); 
const Group = require('../models/group-model.js'); 

module.exports = {

  async searchGroup (info, socket, cb) {
    let groups = await Group.find({nickname: eval("/.*"+info.key+".*/i")});
    cb({isError: false, msg: {groups}});
  },
  
  // @param {object} info  user_id(用户id) & nickname(所要加入的群组昵称)
  async joinGroup (info, socket, cb) {
    let group = await Group.findOne({_id: info._id});
    if(group) {
      user = await User.findOne({ _id: info.user_id });
      if(user && user.groups.indexOf(group._id) !== -1)
        return cb({ isError: true, msg: '您已在该房间'})
      user.groups.push(group._id);
      group.members.push(user._id);
      await user.save(); await group.save();
      socket.join(group._id);
      cb({ isError: false, msg: '您已成功加入该群组' })      
    }
    return cb({isError: true, msg: '不存在该群组'})  
  },

  // @param {object} info  user_id(用户id) & group_id(所要退出的群组id)
  async quitGroup (info, socket, cb) {
    let group = await Group.findOne({_id: info.group_id}),
        user  = await User.findOne({ _id: info.user_id }),
        index = user.groups.indexOf(group._id);
    if(index !== -1){
      user.groups.splice(index, 1);
      let members = group.members.filter(item => item !== user._id );
      group.members = members;
      socket.leave(info.group_id);
      await user.save(); await group.save();
      cb({ isError: false, msg: '已成功退出'});
    }
    cb({ isError: true, msg: '您已不在该群'});  
  },

  // @param {object} info   _id(用户id)
  async initGroupList (info, socket, cb) {
    let userGroups = await User.findOne({ _id: info._id })
          .populate({
            path: 'groups', select: 'avatar nickname _id lastWord lastWordTime',
            populate: {
              path: 'lastWord', select: 'content createAt from msgType',
              populate: {path: 'from', select: 'nickname'}
            }
          });
    if(userGroups){
      let groups = userGroups.groups.map(item => {
        socket.join(item._id);
        let group = {avatar: item.avatar, _id: item._id, nickname: item.nickname, type: 'group'};
        if(item.lastWord) {
          group.lastWord = item.lastWord.content;
          group.msgType = item.lastWord.msgType;
          group.lastWordTime = item.lastWord.createAt;
          group.lastWordSender = item.lastWord.from.nickname
        }
        return group;
      });
      return cb({isError: false, msg: {groups}});
    }
    return cb({isError: true, msg: '服务器好像凌乱了'});   
  }

}
