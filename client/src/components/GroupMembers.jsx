import React, { Component } from 'react';
import PanelHeader from './common/PanelHeader';
import ProfileSection from './common/ProfileSection';
import { socketEmit } from '../redux/actions/common.js';
import { autobind } from 'core-decorators';
import UserItem from './common/UserItem.jsx';
import Loading from './common/Loading';
import DelayAnimation from './common/DelayAnimation';
import '../assete/scss/GroupMembers.scss';
import { formatCompleteDate } from '../util/date.js';

const HOCComponent = function (WrappedComponent) {
  return class extends Component {
    render () {
      return <WrappedComponent {...this.props}/>
    }
  }
}
const MItem = HOCComponent(UserItem);

class GroupMembers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      members: [],
      showMenu: false,
      style: {},
      item: {},
      isAdmin: false
    }
  }
  componentDidMount () {
    socketEmit('merge members', { group_id: this.props.chatting._id })
    .then(data => {
      this.setState({ members: data.members})
    })
    socketEmit('fetch group info', { _id: this.props.chatting._id })
    .then(data => {
      this.setState({ isAdmin: data.info.creator._id === this.props.user_id })    
    })
  }  
  @autobind
  toggleMenu (item) {
    let actualLeft = this.members.offsetLeft,
        current = this.members.offsetParent;
    while(current != null){
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    let containX = this.members.clientWidth,
        containY = this.members.clientHeight;
    return (e) => {
      if(this.state.showMenu){
        this.setState({showMenu: false})
      }
      else{
        let X = e.pageX - actualLeft, 
            Y = e.pageY - this.members.offsetTop,  
            dX, dY;
        if(containX / 2 > X ) dX = 'left'; else { dX = 'right'; X = containX - X};  
        if(containY / 2 > Y ) dY = 'top'; else { dY = 'bottom'; Y = containY - Y};      
        let style = {
          [dX]: X + 'px',
          [dY]: Y + 'px' 
        };
        this.setState({showMenu: true, style, item});
      } 
    }    
  }
  
  render () {
    const { privateChat, block, removeMember, user_id, chatting } = this.props;
    let members = this.state.members.map( item => {
      return (
        <MItem 
          { ...item }  
          key = { item._id } 
          onClick = { this.toggleMenu(item) } 
          onContextMenu = { this.toggleMenu(item) }
        />
      )
    })    
    return (
      <div className='group-members'>
        <PanelHeader 
          direction = 'right' 
          title = '群组成员'
          close = { this.props.close }
        />
        <div  ref = {node => this.members = node}  className = 'results-wrap'>
          { members }
          {
            this.state.showMenu
            && (
              this.state.isAdmin
              ? (
                <ul className = 'menu-list'  
                  style = { this.state.style }
                  onClick = { this.toggleMenu() }
                >
                  <li className = 'list-item' onClick = { () => privateChat({ ...this.state.item, type: 'private' }) }>添加私聊</li>             
                  <li className = 'list-item' onClick = { () => block({ user_id, group_id: chatting._id, m_id: this.state.item._id }) }>禁言此人</li>
                  <li className = 'list-item' onClick = { () => removeMember({ user_id, group_id: chatting._id, m_id: this.state.item._id }) }>移出该群</li>
                </ul>
              )
              : (
                <ul className = 'menu-list' 
                  style = { this.state.style }
                  onClick = { this.toggleMenu() }
                >
                  <li className = 'list-item' onClick = { () => privateChat({ ...this.state.item, type: 'private' }) }>添加私聊</li>
                </ul>
              )
            )
          }
        </div>
      </div>      
    )
  }
  
}
export default GroupMembers;