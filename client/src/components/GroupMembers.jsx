import React, { Component } from 'react';
import PanelHeader from './common/PanelHeader';
import ProfileSection from './common/ProfileSection';
import { socketEmit } from '../redux/actions/common.js';
import { autobind } from 'core-decorators';
import Avatar from './common/Avatar';
import Loading from './common/Loading';
import DelayAnimation from './common/DelayAnimation';
// import '../assete/scss/GroupMembers.scss';
import { formatCompleteDate } from '../util/date.js';

const ResultItem = ({avatar, nickname, onlineState}) => { 
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

class GroupMembers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      members: []
    }
  }
  componentDidMount () {
    socketEmit('merge members', { _id: this.props.chatting._id })
    .then(data => {
      console.log(data);
    })
  }
  render () {
    let members = this.state.members.map( item => {
      return (
        <ResultItem
          { ...item } 
          key = { item._id }
        />
      );
    })
    return (
      <div className='group-profile'>
        <PanelHeader 
          direction = 'right' 
          title = '群组信息'
          close = { close }
        />
        { members }
      </div>
    )
  }
  
}
export default GroupMembers;