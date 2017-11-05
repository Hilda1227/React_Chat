import axios from 'axios';
import io from 'socket.io-client'
import store from '../store' 
import { bindActionCreators } from 'redux'

const dispatch = store.dispatch;

export const socket = io.connect('http://localhost:3004');


export const dispatchAction = (action) => {
  return dispatch(action);
}

export const socketEmit = (name, payload) => {
  console.log('触发socketEmit: ', payload)
  return new Promise(function(resolve, reject) {
    try{
      socket.emit(name, payload, function (data) {
        if(data.isError) reject(data.msg);
        resolve(data.msg);
      });
    }catch(err){
      console.log(`socketEmit出错了~${err}`);
    }
  })
}


