const router = require('koa-router')();
const db = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;
const User = require('../models/user-model.js');

router.post('/api/signUp', async function (ctx){
  let { nickname, email, password } = ctx.request.body,
      repnickname = await User.find({nickname: nickname}),
      repemail = await User.find({email: email});
  if(repnickname.length || repemail.length) {
    return ctx.body = {isError: true, errMsg: '用户已存在'}; 
  }
  // password加密
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  // 新建该用户实例
  let result  = await User.create({ nickname, email, password }),
    // 根据_id生成token
  exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30;
  token = jwt.sign({ user_id: result._id, exp }, SIGN_KEY);  
  result.save();
  ctx.body = {token};

})

router.post('/api/login', async function (ctx) {
  let { email, password } = ctx.request.body;
  let user = await User.findOne({email: email});
  if(!user)  {
    user = await User.findOne({nickname: email});
    if(!user)
      return ctx.body = { isError: true, errMsg: '不存在该用户'};
  }
  if(bcrypt.compareSync(password, user.password)){
    exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30;
    token = jwt.sign({ user_id: user._id, exp },SIGN_KEY);
    return ctx.body = {token}; 
  }
  return ctx.body = { isError: true, errMsg: '密码错误'};
})


module.exports = router.routes();


