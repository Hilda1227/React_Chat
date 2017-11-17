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
  const chatting = store.getState().chatting,
        user = store.getState().user;
  if(msgType === 'file'){
    createFileMessage (message, msgType);
  }
  else if(msgType === 'text'){
    createTextMessage (message, msgType);
  }
}

function createFileMessage (message, msgType) {
  const chatting = store.getState().chatting,
  user = store.getState().user;
  uploadFile(message)
  .then(ret => {
    let content = JSON.stringify({...fileInfo(message), src: ret.data.src});
    socketEmit('new message', {
      msgType,
      type: chatting.get('type'), 
      toId: chatting.get('_id'), 
      content, 
      token: localStorage.getItem('token')
    });
    let data = {
      msgType, 
      sender: user.get('nickname'), 
      createAt: new Date(), 
      content, 
      avatar: user.get('avatar')
    }
    dispatchAction(addMessageItem(data));
    let active = {
        msgType,
        type: chatting.get('type'),
        lastWord:  message, 
        lastWordSender: user.get('nickname'),  
        _id: chatting.get('_id'),
        lastWordTime: new Date(),         
        curRoom: true
      }
      dispatchAction(updateActiveItem(active));
  })
  .catch(err => console.log('发送失败',err))
}


function createTextMessage (message, msgType) {
  const chatting = store.getState().chatting,
  user = store.getState().user;
  socketEmit('new message', {
    msgType, 
    type: chatting.get('type'), 
    toId: chatting.get('_id'), 
    content: message, 
    token: localStorage.getItem('token'),
  })
    let data = {
      msgType,
      type: chatting.get('type'),
      sender: user.get('nickname'), 
      createAt: new Date(), 
      content: message, 
      avatar: user.get('avatar'),
    }
    dispatchAction(addMessageItem(data));
    let active = {
      msgType,
      type: chatting.get('type'),
      lastWord:  message, 
      lastWordSender: user.get('nickname'),  
      _id: chatting.get('_id'),
      lastWordTime: new Date(),         
      curRoom: true
    }
    dispatchAction(updateActiveItem(active));
}