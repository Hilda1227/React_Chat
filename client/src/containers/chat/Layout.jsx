import { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/chat/Layout';


function mapStateToProps(state) {
  return {
    chatting: !state.chatting.isEmpty(),
    showRight: state.pageUI.getIn(['layout','showRightPanel'])
  };
}

export default connect(
    mapStateToProps
)(Layout);