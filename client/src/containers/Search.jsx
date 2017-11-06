import { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { socketEmit } from '../redux/actions/common'
import { addActiveItem } from '../redux/actions/activeList'
import { setChatting } from '../redux/actions/chatting'
import Search from '../components/aside/Search';

function mapDispatchToProps(dispatch) {
  return {
    addUser: payload => {
      socketEmit('find user', { nickname: payload.nickname })
      .then(data => {
        dispatch(addActiveItem(Immutable.fromJS({...data.user, type: 'private'})));
        dispatch(setChatting(Immutable.fromJS({to: data.user.nickname, type: 'private'})));
      })
      .catch(err => alert(err));
    }
  };
}

export default connect(() => ({}), mapDispatchToProps)(Search);