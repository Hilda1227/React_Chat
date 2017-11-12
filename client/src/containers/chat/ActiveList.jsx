import { Component } from 'react';
import { connect } from 'react-redux';

import ActiveList from '../../components/chat/ActiveList';

function mapStateToProps(state) {
  return {
    activeList: state.activeList,
    curRoom: state.chatting.get('_id')
  };
}

export default connect(mapStateToProps)(ActiveList);