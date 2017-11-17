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
    lastWordTime: '', 
    lastWordSender: '',
    unread: Number,
    type: '', // private or group
    _id: ''// 群组_id或私聊对像的_id
  }],
  messages: [{
    from: 'xxx', //当前聊天对象_id或者当前群组的_id
    sender: '', // 发送者昵称
    avatar: 'xxx',
    content: '',
    createAt: 'xxx',
    type: '', // private or groups
    msgType: '', // text or file 
    _id: ''// 消息本身的id
  }],
  chatting: {
    to: 'xxx',
    type: '',
    avatar: '',
    _id: '',
  }
}

