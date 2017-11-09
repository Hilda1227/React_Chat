import React, { Component } from 'react';
import { socketEmit } from '../../redux/actions/common'
import '../../assete/scss/RoomFooter.scss';


const RoomFooter = ({ chatting, user, addMessageItem }) => {
  let input;
  const sendMsg = () => {
    socketEmit('new message', {
      ...chatting.toJS(),
      content: input.value,
      token: localStorage.getItem('token')}
    );
    addMessageItem({
      sender: user.get('nickname'), createAt: '刚刚', 
      content: input.value, avatar: user.get('avatar')}
    );
    input.value = '';    
  } 
  return (
    <div className = { `room-footer${chatting.isEmpty() ? '-hidden' : ''}` }>
      <div className = 'footer-wrap'>
        <input  placeholder = '说点啥呗~' type = 'text'
          ref={ (node) => input=node }
          onKeyDown = { e => { if(e.keyCode === 13) sendMsg() } }
        />
        <div  onClick = { sendMsg } className = 'tool' id = 'send'></div>
        <div  className = 'tool' id = 'emoji'>
        </div>
      </div>
    </div>
  )
}

export default RoomFooter;