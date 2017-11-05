import React from 'react';
import '../../assete/scss/RoomMsgItem.scss';

const RoomMsgItem = (props) => {
  const {from, avatar, content, createAt} = props;
  return (
    <div className = 'room-msg-item'>
      <img src = { avatar } className = 'avatar'/>
      <div className = 'content'>
        <span className = 'from'>{ from }</span>
        <p className = 'msg'>{ content }</p>
        <time></time>
      </div>
    </div>
  )
}

export default RoomMsgItem