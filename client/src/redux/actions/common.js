import axios from 'axios';
import io from 'socket.io-client';
import store from '../store' ;
import config from '../../config/serverConfig.js';

let dispatch = store.dispatch,
    socket = process.env.NODE_ENV === 'development' 
    ? io.connect(`http://${config.development.HOST}:${config.development.PORT}`)
    : io.connect(`http://${config.production.HOST}:${config.production.PORT}`);

module.exports = {
  socket,
  dispatchAction: (action) => {
    return dispatch(action);
  },
  socketEmit: (name, payload) => {
    console.log('触发socketEmit: ', payload)
    payload.token = localStorage.getItem('token');
    return new Promise(function(resolve, reject) {
      try{
        socket.emit(name, payload, function (data) {
        console.log('收到emit返回数据: ',data)
          if(data.isError) reject(data.msg);
          resolve(data.msg);
        });
      }catch(err) {console.log(`socketEmit出错了~${err}`);}
    })
  }
}
