import React from 'react';
import '../../assete/scss/RoomMsgItem.scss';
import { Component } from 'react';
import { connect } from 'react-redux';


let RoomMsgItem = (props) => {
  const {from, avatar, content, createAt, isSelf} = props;
  return (
    <div className = { `room-msg-item room-msg-item${ isSelf ? '-self' : '' }`  }>
      <img src = { avatar } className = 'avatar'/>
      <div className = 'msg'>
        <div className = 'info'>
          <span className = 'from'> { from } </span>
          <time> { createAt } </time>
        </div>
        <p className = 'content'> { content } </p>        
      </div>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    isSelf: state.user.get('nickname') === ownProps.from
  };
}

export default connect(mapStateToProps)(RoomMsgItem);