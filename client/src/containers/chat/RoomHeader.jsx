import { Component } from 'react';
import { connect } from 'react-redux';
import { removeActiveItem } from '../../redux/actions/activeList'
import { closeChatting } from '../../redux/actions/chatting';
import { setChatting } from '../../redux/actions/chatting'
import Immutable from 'immutable'
import { getHistory } from '../../redux/actions/message';


import RoomHeader from '../../components/chat/RoomHeader';

function mapStateToProps(state) {
  return {
    chatting: state.chatting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeChatting: (payload) => {
      dispatch(closeChatting(payload));
      dispatch(removeActiveItem(payload));
    },
    setChatting: (payload) => {
      dispatch(setChatting(payload))
    },
    getHistory: (payload) => dispatch( getHistory(payload) )
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomHeader);