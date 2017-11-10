import { Component } from 'react';
import { connect } from 'react-redux';

import ActiveList from '../../components/chat/ActiveList';

function mapStateToProps(state) {
  return {
    activeList: state.activeList
  };
}

export default connect(mapStateToProps)(ActiveList);