import { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/chat/Layout';


function mapStateToProps(state) {
  return {
    chatting: state.chatting,
    isLoading: state.pageUI.get('isLoading')
  };
}



export default connect(
    mapStateToProps
)(Layout);