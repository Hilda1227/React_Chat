import axios from 'axios';
import io from 'socket.io-client'


const socket = io.connect('http://localhost:3004');

const socketEmit = (name, payload) => {
  return new Promise(function(resolve, reject) {
    try{
      socket.emit(name, payload, function (data) {
        if(data.isError) reject(data.msg);
        resolve(data.msg);
      })
    }catch(err){
      console.log(`socketEmit出错了~${err}`)
    }
  })
}

export default socketEmit;

