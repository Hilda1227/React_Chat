import { Component } from 'react';
import { connect } from 'react-redux';
import { removeActiveItem, quitGroup } from '../../redux/actions/activeList';
import { closeChatting } from '../../redux/actions/chatting';
import Immutable from 'immutable';
import { getHistory } from '../../redux/actions/message';
import RoomHeader from '../../components/chat/RoomHeader';
import { selectRightPanel } from '../../redux/actions/pageUI';

function mapStateToProps(state) {
  return {
    chatting: state.chatting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    delChatting: (payload) => {
      dispatch(closeChatting());
      dispatch(removeActiveItem(payload));
    },
    closeChatting: () => dispatch(closeChatting()),
    quitGroup: (payload) => dispatch(quitGroup(payload)),
    selectRightPanel: (payload) => dispatch(selectRightPanel(payload))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomHeader);