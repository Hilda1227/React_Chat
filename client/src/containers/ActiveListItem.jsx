import { Component } from 'react';
import { connect } from 'react-redux';

import ActiveListitem from '../components/ActiveListitem';
import { setChatting } from '../redux/actions/chatting';
import { restoreInit } from '../redux/actions/pageUI';
import { clearUnread } from '../redux/actions/activeList';



function mapDispatchToProps (dispatch) {
  return {
    setChatting: payload => {
      dispatch(setChatting(payload))
      dispatch(restoreInit());
    },
    clearUnread: payload => {
      dispatch(clearUnread(payload))
    }
  }
}

export default connect(() => {return {}},mapDispatchToProps)(ActiveListitem);