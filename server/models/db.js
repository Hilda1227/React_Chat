const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

(async function (params) {
  try{
    const db = await mongoose.connect('mongodb://localhost/chat-room', { useMongoClient: true });
  }catch(err){
    console.log(`数据库连接失败...${err}`)
  }
})()

 


