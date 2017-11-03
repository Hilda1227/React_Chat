import { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable'
import { addActiveItem } from '../redux/actions/activeList'
import { setChatting } from '../redux/actions/chatting'
import Search from '../components/aside/Search';

function mapDispatchToProps(dispatch) {
  return {
    onEnter: payload => {
      dispatch(addActiveItem(payload));
      dispatch( setChatting( Immutable.fromJS({
        to: payload.nickname,
        type: 'private'
      }) ) );
    }
  };
}

export default connect(
  () => {return {}},
  mapDispatchToProps
)(Search);