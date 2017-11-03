import { Component } from 'react';
import { connect } from 'react-redux';

import ActiveListitem from '../components/aside/ActiveListitem';
import {setChatting} from '../redux/actions/chatting'

function mapDispatchToProps(dispatch) {
  return {
    onClick: payload => {
      dispatch(setChatting(payload))
    }
  }
}

export default connect(
  () => {return {}},
  mapDispatchToProps
)(ActiveListitem);