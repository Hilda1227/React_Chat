import { Component } from 'react';
import { connect } from 'react-redux';
import GroupMembers from '../components/GroupMembers';

function mapStateToProps (state) {
  return {
    chatting: state.chatting.toJS(),
    user_id: state.user.get('_id')   
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupMembers);