import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { searchAddItem } from '../redux/actions/activeList'
import Search from '../components/common/Search';

const SearchUser = (WrapedComponent) => {
  return class extends Component{
    constructor(props){
        super(props);
    }
    @autobind
    handleEnter (val) {
      const { user_id, searchAddItem } = this.props;
      searchAddItem({user_id, nickname: val, type: 'private'})
    }
    render () {
      let props = {
        handleEnter: this.handleEnter,
        placeholder: '搜索开始新的对话'
      }
      return <WrapedComponent {...props}/>
    }
  }
}

export default connect(
  state => ({
    user_id: state.user.get('_id')
  }),
  dispatch => ({
    searchAddItem: (payload) => dispatch(searchAddItem(payload))
  })
)(SearchUser(Search));