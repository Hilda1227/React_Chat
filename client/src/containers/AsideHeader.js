import { Component } from 'react';
import { connect } from 'react-redux';
import AsideHeader from '../components/aside/AsideHeader';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}



export default connect(
    mapStateToProps
)(AsideHeader);