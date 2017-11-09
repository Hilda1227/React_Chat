import React from 'react'
import Immutable from 'immutable'
import '../../assete/scss/ActiveListItem.scss'

const def = {
  avatar: 'https://cdn.dribbble.com/users/255/screenshots/2848799/avatar-rogemon_1x.png',
  onlineState: '离线',
  lastWordTime: new Date()
}

const ActiveListItem = (props) => {
  const { setChatting , nickname, lastWord, avatar, onlineState, lastWordTime, type, unread, clearUnread, _id } = props;
  return (
    <div className = 'active-list-item'
      onClick = {() => {
        setChatting(Immutable.fromJS({ to: nickname, type, _id }));
        if(unread !== 0)  clearUnread({ _id, type });
      }}
    >
      <div className = 'active-item-wrap'>
        <img src = { avatar ? avatar: def.avatar } className = 'avatar'></img>
        <div className = 'info'>
          <p className = 'nickname'>{ nickname }</p>
          <p className = 'last-word'>{ lastWord ? lastWord : (onlineState ? '[在线]' : '[离开]')}</p>
        </div>
        <div className = 'other'>
          <time>{ lastWordTime }</time>
          <span className = {`unread${ unread == 0 || unread == undefined ? '-hidden' : ''}`}>{ unread }</span>
        </div>      
      </div>
      
     </div>
  ) 
}

export default ActiveListItem