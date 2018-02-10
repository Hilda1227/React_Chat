import { Component } from 'react';
import { connect } from 'react-redux';
import GroupMembers from '../components/GroupMembers';
import { addActiveItem } from '../redux/actions/activeList.js';
import { toggleRightPanel } from '../redux/actions/pageUI.js';
import { setChatting } from '../redux/actions/chatting.js';
import { block, relieveBlock, removeMember } from '../redux/actions/group.js';
function mapStateToProps (state) {
  return {
    chatting: state.chatting.toJS(),
    user_id: state.user.get('_id')   
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    privateChat: (payload) => {
      dispatch(addActiveItem(payload));
      dispatch(setChatting({ ...payload, to: payload.nickname }))
      dispatch(toggleRightPanel());
    },
    block: (payload) => dispatch(block(payload)),
    relieveBlock: (payload) => dispatch(relieveBlock(payload)),
    removeMember: (payload) => dispatch(removeMember(payload))
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupMembers);