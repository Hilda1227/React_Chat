import React from 'react';
import '../../assete/scss/RoomMsgItem.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../util'


let RoomMsgItem = (props) => {
  const {sender, avatar, content, createAt, isSelf} = props;
  return (
    <div className = { `room-msg-item room-msg-item${ isSelf ? '-self' : '-other' }`  }>
      <img src = { avatar } className = 'avatar'/>
      <div className = 'msg'>
        <div className = 'top'>
          <span className = 'sender'> { sender } </span> 
          <time> { formatDate(createAt) } </time>
        </div>
        <p className = 'content'> { content } </p>               
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