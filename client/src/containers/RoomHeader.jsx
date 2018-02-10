import { Component } from 'react';
import { connect } from 'react-redux';
import { removeActiveItem} from '../redux/actions/activeList';
import { quitGroup } from '../redux/actions/group';
import { closeChatting } from '../redux/actions/chatting';
import Immutable from 'immutable';
import { getHistory } from '../redux/actions/message';
import RoomHeader from '../components/RoomHeader';
import { selectRightPanel } from '../redux/actions/pageUI';

function mapStateToProps(state) {
  return {
    chatting: state.chatting,
    themeColor: state.pageUI.get('themeColor')
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