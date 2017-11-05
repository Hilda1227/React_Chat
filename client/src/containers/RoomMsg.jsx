import { Component } from 'react';
import { connect } from 'react-redux';
import { getHistory } from '../redux/actions/message';

import RoomMsg from '../components/room/RoomMsg';

function mapStateToProps (state) {
  return {
    chatting: state.chatting,
    messages: state.message
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getHistory: (payload) => dispatch( getHistory(payload) )
  };
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomMsg);