import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3004';

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