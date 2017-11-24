import React from 'react'
import Immutable from 'immutable'
import { formatDate } from '../../util/date.js'
import '../../assete/scss/ActiveListItem.scss'


const ActiveListItem = (props) => {
  let {
    isCur, setChatting , nickname, lastWord, avatar, lastWordTime,
    type, unread, clearUnread, _id, lastWordSender, msgType
  } = props;

  lastWord = (lastWord && msgType === 'text') 
             ? lastWord 
             : (lastWord ? ('[' + msgType + ' message]') : null);
  return (   
    <div className = { `active-list-item active-list-item${isCur ? '-cur' : ''}` }
      onClick = {() => {
        setChatting(Immutable.fromJS({ to: nickname, type, _id, avatar }));
        if(unread !== 0)  clearUnread({ _id, type });
      }}
    >
      <div className = 'active-item-wrap'>
        <div style = {{ 'backgroundImage': `url(${avatar})`}} className = 'avatar'></div>
        <div className = 'info'>
          <p className = 'nickname'>{ nickname }</p>
          <p className = 'last-word'>{ lastWord ? (lastWordSender + ': ' +lastWord) : '开始对话' }</p>
        </div>
        <div className = 'other'> 
          <time>{ formatDate(lastWordTime ? lastWordTime : new Date()) }</time>
          <span className = {`unread${ unread == 0 || unread == undefined ? '-hidden' : ''}`}>{ unread }</span>
        </div>      
      </div>
      
     </div>
  ) 
}

export default ActiveListItem
//     nickname: '',
//     avatar: '',
//     lastWord: '',
//     onlineState: '',//仅私聊
//     lastWordTime: '', 
//     unread: Number,
//     type: 'private or group',
//     _id: ''// 群组_id或私聊对像的_id