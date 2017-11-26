import axios from 'axios';
import {
  dispatchAction, 
  socketEmit
} from '../redux/actions/common';
import { initRoomList } from '../redux/actions/activeList';
import { setUser } from '../redux/actions/user';

axios.defaults.baseURL = 'http://127.0.0.1:3004';

function formData (data) {
  let formdata = new FormData();
  Object.keys(data).forEach(key => {
    if(typeof data[key] !== 'null' && typeof data[key] !== 'undefined')
      console.log(data[key])
      formdata.append(key, data[key]);
  })
  return formdata;
}

export const uploadFile = (file) => {
    let formdata = new FormData();
    formdata.append('file',file);
    return axios.post('/upload/file', formdata, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
}

export const fileInfo = (file) => {
    let k = 1024.00;
    let size = file.size;
    if(size < k){
      size = size.toFixed(2) + 'B';
    }
    else if(size < k * k){
      size = (size / k).toFixed(2) + 'KB';
    }
    else if(size < Math.pow(k, 3)){
      size = (size / Math.pow(k, 2)).toFixed(2) + 'MB';
    }
    else if(size > Math.pow(k, 3)){
      return false;
    };
    return {fileName: file.name, size};
}

export const createGroup = (info) => {
  let formdata = formData(info);
  return axios.post('/api/createGroup', formdata, {
    headers: {'Content-Type': 'multipart/form-data'}
  })
  .then(res => {
    console.log('返回',res.data)
    return dispatchAction(initRoomList(info._id));
  })
  .catch(err => console.log(err))
}

export const modifyInfo = (info) => {
  let formdata = formData(info);
  return axios.post('/api/modifyInfo', formdata, {
    headers: {'Content-Type': 'multipart/form-data'}
  })
  .then(res => {
    if(!res.data.isError) {
      console.log('返回',res.data.msg)
      return dispatchAction(setUser(res.data.msg.user));
    }
    else{
      alert(res.data.msg);
    }
  })
  .catch(err => console.log(err))
}

