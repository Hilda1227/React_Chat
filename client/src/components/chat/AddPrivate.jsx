import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import '../../assete/scss/JoinGroup.scss';
import Search from '../common/Search';
import PanelHeader from '../common/PanelHeader';
import Loading from '../common/Loading';
import { connect } from 'react-redux';
import { socketEmit } from '../../redux/actions/common.js';
import { addActiveItem } from '../../redux/actions/activeList.js';
import Avatar from '../common/Avatar';

const ResultItem = ({avatar, nickname, add, onlineState}) => { 
  return (
    <div  onClick = { add } className = 'item-wrap'>
      <div className = 'item'>
        <Avatar src = { avatar }  size = '2.7rem' />
        <div className = 'info'>
          <span className = 'nickname'>{ nickname }</span>
          <p className = 'other'>{ '[' + (onlineState ? '在线' : '离开') + ']' }</p>
        </div>
      </div>
    </div>
  )
}
class addPrivate extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.setState({isLoading: true});
    socketEmit('search users', {key: ''})
    .then(data => {
      this.setState({
        users: data.users,
        isLoading: false
      });
    })
  }
  
  @autobind
  searchUser (val) {
    socketEmit('search users', {key: val})
    .then(data => {
      this.setState({users: data.users});
    })
  }
  render () {
    let users = this.state.users.map( item => {
    return (
      <ResultItem
        { ...item } 
        key = { item._id }
        add = { () => {
          this.props.addPrivate({...item, type: 'private'});
          this.props.close();
        }}
      />
    )
    })
    return (
      <div className = ' left-panel-wrap add-chat'>
        <PanelHeader  title = '添加私聊' close = { this.props.close } />
        <Search
          placeholder = '请输入对方的昵称'
          handleChange = { this.searchUser }
        />
        { this.state.isLoading && <Loading  top = { 5 }  /> }
        <div className = 'results-wrap'>
          {
            this.state.users.length
            ? (<div className = 'results'>{ users }</div>)
            : (<span className = 'none'>没有相关的成员噢~</span>)
          } 
        </div>
      </div>
    );
  }
}

export default connect( 
  () =>({}), 
  dispatch => {
    return {
      addPrivate: payload => dispatch(addActiveItem(payload))
    };
  }
)(addPrivate);
