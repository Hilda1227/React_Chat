import React from 'react';
import '../../assete/scss/RoomMsgItem.scss';
import { Component } from 'react';
import { connect } from 'react-redux';


let RoomMsgItem = (props) => {
  const {sender, avatar, content, createAt, isSelf} = props;
  return (
    <div className = { `room-msg-item room-msg-item${ isSelf ? '-self' : '' }`  }>
      <img src = { avatar } className = 'avatar'/>
      <div className = 'msg'>
        <span className = 'sender'> { sender } </span>
        <div className = 'content-wrap'>        
          <p className = 'content'> { content } </p> 
          <time> { createAt } </time>
        </div>       
      </div>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    isSelf: state.user.get('nickname') === ownProps.sender
  };
}

export default connect(mapStateToProps)(RoomMsgItem);