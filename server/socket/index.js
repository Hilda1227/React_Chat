const jwt = require('jsonwebtoken');
const SIGN_KEY = require('../config/JWT_KEY').SIGN_KEY;
const user = require('../controllers/user');

function parseTaken (info) {
  return new Promise(function (resolve, reject){
    try{
      info.user_id = jwt.verify(info.taken, SIGN_KEY);
    }catch(err){
      reject(err);
    }
    resolve(info);
  })
  
}

module.exports = function socket (io){ 
  io.sockets.on('connection', function (socket) {

    socket.on('login', (info, cb) => {
      user.login(info, socket, cb)
      .catch(err => cb({isError: true, errMsg: err}))
    });    
  
    socket.on('signUp', (info, cb) => {
      user.signUp(info, socket, cb)
      .catch(err => cb({isError: true, errMsg: err}))
    })

    socket.on('disconnect', (info) => {
      user.disconnect(info, socket)
      // console.log(info);
      // parseTaken(info)
      // .then(() => user.disconnect(info, socket, cb))
      // .catch(err => console.log(err))
    })

  })
}



  