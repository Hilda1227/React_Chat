/**
 * 本文档的作用在于直观的呈现整个dom树结构 及其初始值
 */
const store = {
  token:'',
  user: {
    nickname: 'xxx',
    avatar: 'xxx',
    sex: 'xxx',
  },
  activeList: [{
    nickname: '',
    avatar: '',
    lastWord: '',
    lastWordTime: '', 
  }],
  messages: [{
    nickname: 'xxx',
    avatar: 'xxx',
    content: 'xxx',
    createAt: 'xxx'
  }],
  chatting: {
    to: 'xxx',
    type: 'private',
  }
}

