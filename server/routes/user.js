const  router = require('koa-router')();
const body = require('koa-better-body');
const uploadFile = require('../util/upload.js');


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

module.exports = router.routes();


  

