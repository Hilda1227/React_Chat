import { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { socketEmit } from '../../redux/actions/common'
import { searchAddItem } from '../../redux/actions/activeList'
import { setChatting } from '../../redux/actions/chatting'
import Search from '../../components/chat/Search';

function mapDispatchToProps(dispatch) {
  return {
    searchAddItem: (payload) => dispatch(searchAddItem(payload))
    
  };
}

export default connect(() => ({}), mapDispatchToProps)(Search);