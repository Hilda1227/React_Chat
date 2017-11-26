import { Component } from 'react';
import { connect } from 'react-redux';
import { removeActiveItem, quitGroup } from '../../redux/actions/activeList';
import { closeChatting } from '../../redux/actions/chatting';
import Immutable from 'immutable';
import { getHistory } from '../../redux/actions/message';
import RoomHeader from '../../components/chat/RoomHeader';

function mapStateToProps(state) {
  return {
    chatting: state.chatting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    delChatting: (payload) => {
      dispatch(closeChatting(payload));
      dispatch(removeActiveItem(payload));
    },
    quitGroup: (payload) => dispatch(quitGroup(payload))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomHeader);