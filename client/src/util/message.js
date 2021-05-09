import store from '../redux/store'
import {
  dispatchAction,
  socketEmit
} from '../redux/actions/common'

import {
  uploadFile,
  fileInfo
} from './upload'

import { addMessageItem, setStatus, setFileSrc } from '../redux/actions/message'
import { updateActiveItem, addActiveItem } from '../redux/actions/activeList'
import { showAlert } from '../redux/actions/pageUI.js'

export function handleMessage (message) {
  // 如果消息的来源是正在聊天的对象
  const curRoom = message.from === store.getState().chatting.get('_id')
  if (curRoom) {
    dispatchAction(addMessageItem(message))
  }
  const data = {
    type: message.type,
    lastWord: message.content,
    lastWordSender: message.sender,
    _id: message.from,
    lastWordTime: message.createAt,
    msgType: message.msgType,
    avatar: message.avatar,
    nickname: message.sender,
    curRoom
  }
  dispatchAction(addActiveItem(data))
  dispatchAction(updateActiveItem(data))
}

export function createMessage (message, msgType) {
  switch (msgType) {
    case 'file': return createFileMessage(message, msgType)
    case 'text': return createTextMessage(message, msgType)
    case 'image': return createImageMessage(message, msgType)
    default:
  }
}

function createTextMessage (message, msgType) {
  const chatting = store.getState().chatting
  const user = store.getState().user
  const preView = {
    msgType,
    type: chatting.get('type'),
    sender: user.get('nickname'),
    createAt: new Date(),
    content: message,
    avatar: user.get('avatar'),
    status: 'pending',
    _id: Date.now()
  }
  dispatchAction(addMessageItem(preView))
  socketEmit('new message', {
    msgType,
    type: chatting.get('type'),
    toId: chatting.get('_id'),
    content: message,
    token: localStorage.getItem('token')
  })
    .then(() => {
      dispatchAction(updateActiveItem({
        msgType,
        type: chatting.get('type'),
        lastWord: message,
        lastWordSender: user.get('nickname'),
        _id: chatting.get('_id'),
        lastWordTime: new Date(),
        curRoom: true
      }))
      dispatchAction(setStatus({ id: preView._id, status: 'success' }))
    })
    .catch((err) => {
      dispatchAction(setStatus({ id: preView._id, status: 'failed' }))
      dispatchAction(showAlert(err))
    })
}

function createImageMessage (message, msgType) {
  const reader = new FileReader()
  reader.readAsDataURL(message)
  reader.addEventListener('load', () => {
    const chatting = store.getState().chatting
    const user = store.getState().user
    const preView = {
      msgType,
      type: chatting.get('type'),
      sender: user.get('nickname'),
      createAt: new Date(),
      content: reader.result,
      avatar: user.get('avatar'),
      status: 'pending',
      _id: Date.now()
    }
    dispatchAction(addMessageItem(preView))
    uploadFile(message)
      .then(ret => {
        socketEmit('new message', {
          msgType,
          type: chatting.get('type'),
          toId: chatting.get('_id'),
          content: ret.data.src,
          token: localStorage.getItem('token')
        })
          .then(() => {
            dispatchAction(updateActiveItem({
              msgType,
              type: chatting.get('type'),
              lastWord: message,
              lastWordSender: user.get('nickname'),
              _id: chatting.get('_id'),
              lastWordTime: new Date(),
              curRoom: true
            }))
            dispatchAction(setStatus({ id: preView._id, status: 'success' }))
          })
          .catch((err) => {
            dispatchAction(setStatus({ id: preView._id, status: 'failed' }))
            dispatchAction(showAlert(err))
          })
      })
  }, false)
}

function createFileMessage (message, msgType) {
  const isImage = /image\/\w+/.test(message.type)
  if (isImage) {
    return createImageMessage(message, 'image')
  }
  const chatting = store.getState().chatting
  const user = store.getState().user
  const info = fileInfo(message)
  const preView = {
    msgType,
    type: chatting.get('type'),
    sender: user.get('nickname'),
    createAt: new Date(),
    content: JSON.stringify({ ...info, src: '#' }),
    avatar: user.get('avatar'),
    status: 'pending',
    _id: Date.now()
  }
  if (!info) return dispatchAction(showAlert('文件过大'))
  dispatchAction(addMessageItem(preView))
  uploadFile(message)
    .then(ret => {
      const content = JSON.stringify({ ...info, src: ret.data.src })
      socketEmit('new message', {
        msgType,
        type: chatting.get('type'),
        toId: chatting.get('_id'),
        content,
        token: localStorage.getItem('token')
      })
        .then(() => {
          dispatchAction(updateActiveItem({
            msgType,
            type: chatting.get('type'),
            lastWord: content,
            lastWordSender: user.get('nickname'),
            _id: chatting.get('_id'),
            lastWordTime: new Date(),
            curRoom: true
          }))
          dispatchAction(setFileSrc({ _id: preView._id, src: ret.data.src }))
          dispatchAction(setStatus({ id: preView._id, status: 'success' }))
        })
        .catch((err) => {
          dispatchAction(setStatus({ id: preView._id, status: 'failed' }))
          dispatchAction(showAlert(err))
        })
    })
    .catch(err => { dispatchAction(showAlert('发送失败')); console.log(err) })
}
