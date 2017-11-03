import React from 'react'
import Immutable from 'immutable'
import '../../assete/scss/ActiveListItem.scss'

const def = {
  avatar: 'https://cdn.dribbble.com/users/255/screenshots/2848799/avatar-rogemon_1x.png',
  lastWord: '开始对话',
  lastWordTime: new Date()
}

const ActiveListItem = (props) => {
  const { onClick , nickname, avatar, lastWord, lastWordTime, type } = props;
  return (
    <div onClick = { () => onClick(Immutable.fromJS({ to: nickname, type })) } className = 'active-list-item'>
    <div className = 'active-item-wrap'>
      <img src = { avatar ? avatar: def.avatar } className = 'avatar'></img>
      <div className = 'info'>
        <p className = 'nickname'>{ nickname }</p>
        <p className = 'last-word'>{ lastWord ? lastWord: def.lastWord }</p>
      </div>
      <time>{ lastWordTime }</time>
    </div>
  </div>
  ) 
}

export default ActiveListItem