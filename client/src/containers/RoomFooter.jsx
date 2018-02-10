import { Component } from 'react';
import { connect } from 'react-redux';
import { addMessageItem } from '../redux/actions/message';
import { toggleTools, toggleExpressions } from '../redux/actions/pageUI';
import RoomFooter from '../components/RoomFooter';

export default connect(
  state => ({
    chatting: state.chatting,
    user: state.user,
    showTools: state.pageUI.getIn(['layout', 'showTools']),
    showExpressions: state.pageUI.getIn(['layout', 'showExpressions']),
    themeColor: state.pageUI.get('themeColor')
  }),
  dispatch => ({
    toggleTools: () => dispatch(toggleTools()),
    toggleExpressions: () => dispatch(toggleExpressions())
  })
)(RoomFooter);