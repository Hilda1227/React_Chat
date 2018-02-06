import React from 'react';
import Avatar from './Avatar';
import '../../assete/scss/UserItem.scss';
const UserItem = ({avatar, nickname, onlineState, onContextMenu, onClick}) => { 
  return (
    <div className = 'user-item'
      onClick = { onClick || null }
      onContextMenu = { onContextMenu || null }
    >
      <div className = 'item'>
        <Avatar src = { avatar }  
          size = '3rem'        
        />
        <div className = 'info'>
          <span className = 'nickname'>{ nickname }</span>
          <p className = 'other'>{ '[' + (onlineState ? '在线' : '离开') + ']' }</p>
        </div>
      </div>
    </div>
  )
}

export default UserItem;