import React, { Component } from 'react';
import { socketEmit } from '../../redux/actions/common'
import '../../assete/scss/RoomFooter.scss';


const RoomFooter = ({ chatting }) => {
  let input;
  const sendMsg = () => {
    socketEmit('new message', {
      content: input.value,
      to: chatting.get('to'),
      type: chatting.get('type'),
      token: localStorage.getItem('token')
    })
  } 
  return (
    <div className = { `room-footer${chatting.isEmpty() ? '-hidden' : ''}` }>
      <div className = 'footer-wrap'>
        <input  placeholder = '说点啥呗~' type = 'text'
          ref={ (node) => input=node }
        />
        <div  onClick = { sendMsg } className = 'tool' id = 'send'></div>
        <div  className = 'tool' id = 'emoji'>
        </div>
      </div>
    </div>
  )
}

export default RoomFooter;