import store from '../redux/store'
import {
  dispatchAction, 
  socketEmit
} from '../redux/actions/common' 

import {
  uploadFile, 
  fileInfo
} from './upload'
  
import { addMessageItem } from '../redux/actions/message'
import { updateActiveItem } from '../redux/actions/activeList'

  
export function handleMessage (message) {
    // 如果消息的来源是正在聊天的对象
  let curRoom = message.from === store.getState().chatting.get('_id');
  if(curRoom){
    dispatchAction(addMessageItem(message));
  }
  let data = {
    type: message.type,
    lastWord:  message.content, 
    lastWordSender: message.sender,
    _id: message.from,
    lastWordTime: message.createAt,
    msgType: message.msgType,
    curRoom,
  }
  dispatchAction(updateActiveItem(data));
}


export function createMessage (message, msgType) {
  switch (msgType) {
    case 'file': return createFileMessage (message, msgType);
    case 'text': return createTextMessage (message, msgType);
    case 'image': return createImageMessage (message, msgType);
    default: return;
  }
}

function createFileMessage (message, msgType) {
  let isImage = /image\/\w+/.test(message.type);
  console.log(isImage)
  if(isImage){
    return createImageMessage (message, 'image');    
  }
  uploadFile(message)
  .then(ret => {
    let content = JSON.stringify({...fileInfo(message), src: ret.data.src});      
    sendMessage(content, msgType)
  })
  .catch(err => console.log('发送失败',err))
}

function createTextMessage (message, msgType) {
  sendMessage(message, msgType)
}

function createImageMessage (message, msgType) {    
  let reader = new FileReader();
  reader.readAsDataURL(message);
  reader.addEventListener("load", () => {
    sendMessage(reader.result, msgType)         
  }, false);   
}

function sendMessage (message, msgType) {
  const chatting = store.getState().chatting,
        user = store.getState().user;
  dispatchAction(addMessageItem({
    msgType,
    type: chatting.get('type'),
    sender: user.get('nickname'), 
    createAt: new Date(), 
    content: message, 
    avatar: user.get('avatar'),
  }));

  socketEmit('new message', {
    msgType, 
    type: chatting.get('type'), 
    toId: chatting.get('_id'), 
    content: message, 
    token: localStorage.getItem('token'),
  })
  
  dispatchAction(updateActiveItem({
    msgType,
    type: chatting.get('type'),
    lastWord:  message, 
    lastWordSender: user.get('nickname'),  
    _id: chatting.get('_id'),
    lastWordTime: new Date(),         
    curRoom: true
  }));
}