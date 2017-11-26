import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import '../../assete/scss/JoinGroup.scss';
import Search from '../common/Search';
import LeftHeader from '../common/LeftHeader';
import Loading from '../common/Loading';
import { socketEmit } from '../../redux/actions/common.js';

const GroupItem = ({avatar, nickname, describe, join}) => {
  
  return (
    <div  onClick = { join } className = 'group-item-wrap'>
      <div className = 'group-item'>
        <div  style = {{ backgroundImage: `url(${ avatar })` }} className = 'avatar'></div>
        <div className = 'info'>
          <span className = 'nickname'>{ nickname }</span>
          <p className = 'describe'>{ describe }</p>
        </div>
      </div>
    </div>
  )
}

class JoinGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      groups: [],
      isLoading: false
    }
  }
  @autobind
  searchGroup (val) {
    val
    socketEmit('search groups', {key: val})
    .then(data => {
      this.setState({groups: data.groups});
    })
  }
  join (_id) {
    socketEmit('join group', { _id })
    .then(data => {
      this.setState({ isLoading: false })
      this.props.close();
    })
    .catch(err => alert(err))
  }
  render () {
    let groups = this.state.groups.map( item => {
      return (
              <GroupItem
                { ...item } 
                key = { item._id }
                join = { () => this.join(item._id) }
              />
             );
    })
    return (
      <div className = ' left-panel-wrap join-group'>
        <LeftHeader  title = '加入群组' />
        <Search
          placeholder = '请输入想要加入的群组'
          handleChange = { this.searchGroup }
        />
        <div className = 'groups-wrap'>
          { this.state.isLoading && <Loading/> }
          {
            !this.state.groups.length
            ? <span className = 'none'>没有相关的群组噢~</span>
            : (
              <div className = 'groups'>{ groups }</div>
            )
          } 
        </div>
      </div>
    );
  }
}

export default JoinGroup;