import { Component } from 'react';
import { connect } from 'react-redux';
// import { closeChatting } from '../redux/actions/chatting';

import RoomFooter from '../components/room/RoomFooter';

function mapStateToProps(state) {
  return {
    chatting: state.chatting
  };
}



export default connect(
    mapStateToProps
)(RoomFooter);