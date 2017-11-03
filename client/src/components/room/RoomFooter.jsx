import React from 'react';
import '../../assete/scss/RoomFooter.scss';

const RoomFooter = ({}) => (
  <div className = 'room-footer'>
    <div className = 'footer-wrap'>
      <input placeholder = '说点啥呗~' type = 'text'/>
      <div className = 'tool' id = 'emoji'></div>
      <div className = 'tool' id = 'send'></div>
    </div>
  </div>
)

export default RoomFooter;