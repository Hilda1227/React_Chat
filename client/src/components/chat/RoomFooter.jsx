import React, { Component } from 'react';
import { socketEmit } from '../../redux/actions/common'
import '../../assete/scss/RoomFooter.scss';


const RoomFooter = ({ chatting, user, addMessageItem }) => {
  let input;
  const sendMsg = () => {
    socketEmit('new message', {
      type: chatting.get('type'),
      toId: chatting.get('_id'),
      content: input.value,
      token: localStorage.getItem('token')}
    );
    addMessageItem({
      sender: user.get('nickname'), 
      createAt: new Date(), 
      content: input.value, 
      avatar: user.get('avatar')}
    );
    input.value = '';    
  } 
  return (
    <div className = 'room-footer'>
      <div className = 'footer-wrap'>
        <input  placeholder = '说点啥呗~' type = 'text'
          ref={ (node) => input=node }
          onKeyDown = { e => { if(e.keyCode === 13) sendMsg() } }
        />
        <div  onClick = { sendMsg } className = 'tool' id = 'send'></div>
        <div  className = 'tool' id = 'emoji'>
        </div>
      </div>     
        <ul className = 'more'>
          <li className = 'button-item' id = 'button-file'><input type = 'file'/></li>
        </ul> 
    </div>
  )
}

export default RoomFooter;