const  router = require('koa-router')();
const body = require('koa-better-body');
const config = require('../config/init-config.js');
const uploadFile = require('../util/upload.js');

const User = require('../models/user-model.js');
const Group = require('../models/group-model.js');


router.post('/upload/file',async function (ctx) {
  let file = ctx.request.files[0]; 
  try{
    let ret = await uploadFile(`${+new Date() + file.name}`, file.path);
    console.log('文件上传成功', ret)
    ctx.body = ret;
  }catch(err){
    console.log('上传失败', err)
    ctx.body = {isError: true, msg: err};
  }
})

router.post('/api/createGroup',async function (ctx) { 
  const { nickname, describe, _id } = ctx.request.fields;  
  let info = { nickname, creator: _id };
  let file= ctx.request.files[0];
  if(file){
    let ret = await uploadFile(`${Date.now() + file.name}`, file.path);
    info.avatar = ret.src;
  }
  if(describe) info.describe = describe;
  user = await User.findOne({ _id: _id });
  group = await new Group({...info});
  group.members.push(_id);
  user.groups.push(group._id);
  await user.save(); await group.save();
  ctx.body = ({ isError: false, msg: { group }});
})

router.post('/api/modifyUserInfo',async function (ctx) { 
  const { nickname, sex, place, _id } = ctx.request.fields;  
  let exist = await User.findOne({nickname, _id: {$ne: _id}});
  if(exist) return ctx.body = ({ isError: true, msg: '该用户名已被使用'});
  let info = {nickname, sex, place};
  let file= ctx.request.files[0];
  if(file){
    let ret = await uploadFile(`${Date.now() + file.name}`, file.path);
    info.avatar = ret.src;
  }
  await User.update({_id: _id},{$set: {...info}});
  let user = await User.findOne({_id});
  ctx.body = ({ isError: false, msg: { user }});
})

router.post('/api/modifyUserpInfo',async function (ctx) { 
  const { nickname, sex, place, _id } = ctx.request.fields;  
  let exist = await User.findOne({nickname, _id: {$ne: _id}});
  if(exist) return ctx.body = ({ isError: true, msg: '该用户名已被使用'});
  let info = {nickname, sex, place};
  let file= ctx.request.files[0];
  if(file){
    let ret = await uploadFile(`${Date.now() + file.name}`, file.path);
    info.avatar = ret.src;
  }
  await User.update({_id: _id},{$set: {...info}});
  let user = await User.findOne({_id});
  ctx.body = ({ isError: false, msg: { user }});
})

router.post('/api/modifyGroupInfo',async function (ctx) { 
  const { nickname, describe, _id, user_id } = ctx.request.fields;
  let group = await Group.findOne({ _id });
  if(!group.creator === user_id){
    return ctx.body = ({ isError: true, msg: '权限不足'});    
  }
  let info = { nickname, describe };
  let file= ctx.request.files[0];
  if(file){
    let ret = await uploadFile(`${Date.now() + file.name}`, file.path);
    info.avatar = ret.src;
  }
  await Group.update({_id: _id},{$set: {...info}});
  group = await Group.findOne({_id});
  ctx.body = ({ isError: false, msg: { group }});
})

module.exports = router.routes();


  

