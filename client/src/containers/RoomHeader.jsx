import { Component } from 'react';
import { connect } from 'react-redux';
import { removeActiveItem } from '../redux/actions/activeList'
// import { closeChatting } from '../redux/actions/chatting';
import {setChatting} from '../redux/actions/chatting'
// import { closeChatting } from '../redux/actions/chatting';

import RoomHeader from '../components/room/RoomHeader';

function mapStateToProps(state) {
  return {
    chatting: state.chatting,
    activeList: state.activeList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeChatting: (payload) => {
      dispatch(removeActiveItem(payload));
    },
    setChatting: (payload) => {
      dispatch(setChatting(payload))
    }
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomHeader);