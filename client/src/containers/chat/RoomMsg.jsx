import { Component } from 'react';
import { connect } from 'react-redux';
import { initHistory, addHistory } from '../../redux/actions/message';

import RoomMsg from '../../components/chat/RoomMsg';

function mapStateToProps (state) {
  return {
    chatting: state.chatting,
    messages: state.message,
    user: state.user.get('nickname')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    initHistory: (payload) => dispatch(initHistory(payload)),
    addHistory: (payload) => dispatch(addHistory(payload))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomMsg);