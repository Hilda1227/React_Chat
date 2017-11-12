/**
 * 本文档的作用在于直观的呈现整个dom树结构 及其初始值
 */
const store = {
  user: {
    nickname: 'xxx',
    avatar: 'xxx',
    sex: 'xxx',
    _id: '',
  },
  activeList: [{
    nickname: '',
    avatar: '',
    lastWord: '',
    onlineState: '',//仅私聊
    lastWordTime: '', 
    lastSender: '',
    unread: Number,
    type: 'private or group',
    _id: ''// 群组_id或私聊对像的_id
  }],
  messages: [{
    from: 'xxx',
    avatar: 'xxx',
    content: 'xxx',
    createAt: 'xxx',
    _id: ''
  }],
  chatting: {
    to: 'xxx',
    type: 'private',
    avatar: '',
    _id: '',
  }
}

