import { Component } from 'react';
import { connect } from 'react-redux';
import GroupProfile from '../components/GroupProfile';
import { setActiveItem, quitGroup } from '../redux/actions/activelist';
import { setChatting } from '../redux/actions/chatting';

function mapStateToProps (state) {
  return {
    chatting: state.chatting.toJS(),
    user_id: state.user.get('_id')   
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    updateModify: payload => {
      dispatch(setActiveItem(payload));
      dispatch(setChatting({
        to: payload.nickname,
        type: 'group',
        _id: payload._id,
        avatar: payload.avatar
      }));
    },
    quitGroup: (payload) => dispatch(quitGroup(payload))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupProfile);