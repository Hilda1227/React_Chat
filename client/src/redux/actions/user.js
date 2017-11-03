import axios from 'axios';
import io from 'socket.io-client'


const socket = io.connect('http://localhost:3004');

socket.emit('login',{here:  "加油~"})
axios.defaults.baseURL = 'http://localhost:3004';


export const signUp = (info) => {
  return axios.post('/api/signUp', info)
    .then((res) => {
      if(!res.data.isError)
        localStorage.setItem('token', res.data.token);
      return res;
    })
}

export const login = (info) => {
  return axios.post('/api/login', info)
  .then(res => {
    if(!res.data.isError)
      localStorage.setItem('token', res.data.token);
    return res;
  })
}

