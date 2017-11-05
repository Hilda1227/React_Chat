import { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

function mapStateToProps(state) {
  return {
    chatting: state.chatting
  };
}



export default connect(
    mapStateToProps
)(Layout);