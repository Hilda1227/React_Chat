import { Component } from 'react';
import { connect } from 'react-redux';
import { addMessageItem } from '../../redux/actions/message';

import RoomFooter from '../../components/chat/RoomFooter';

function mapStateToProps(state) {
  return {
    chatting: state.chatting,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessageItem: payload => dispatch(addMessageItem(payload))
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(RoomFooter);