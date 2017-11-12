import { Component } from 'react';
import { connect } from 'react-redux';

import ActiveListitem from '../../components/chat/ActiveListitem';
import { setChatting } from '../../redux/actions/chatting'
import { clearUnread } from '../../redux/actions/activeList'



function mapDispatchToProps (dispatch) {
  return {
    setChatting: payload => {
      dispatch(setChatting(payload))
    },
    clearUnread: payload => {
      dispatch(clearUnread(payload))
    }
  }
}

export default connect(
  () => {return {}},
  mapDispatchToProps
)(ActiveListitem);