import React from 'react';
import '../../assete/scss/RoomMsg.scss';
import RoomMsgItem from './RoomMsgItem';

const RoomMsg = () => (
  <div className = 'room-msg'>
    <div className = 'room-msg-wrap'>
      <RoomMsgItem/>
    </div>
  </div>
)

export default RoomMsg