import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3004';

export const uploadFile = (file) => {
    let formdata = new FormData();
    formdata.append('file',file);
    console.log('什么鬼')
    return axios.post('/upload/file', formdata, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
    
      
 
}

export const fileInfo = (file) => {
    let size = file.size
    return {fileName: file.name, size}
}