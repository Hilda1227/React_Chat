import React, { Component } from 'react';
import PanelHeader from '../common/PanelHeader';
import ProfileSection from '../common/ProfileSection';
import EditableInput from '../common/EditableInput';
import Avatar from '../common/Avatar';
import { socketEmit } from '../../redux/actions/common.js';
import { autobind } from 'core-decorators';
import '../../assete/scss/UserProfile.scss';

class UserProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
        nickname: '',
        sex: '',
        avatar: '',
        createAt: '',
        place: '',
        onlineState: false
    }
  }
  componentDidMount () {
    socketEmit('fetch user info', { _id: this.props.chatting._id })
    .then(data => {this.setState({ ...data.info })})
  }
  
  render () {
    const { nickname, sex, avatar, place, createAt, onlineState } = this.state;
    return (
      <div className='user-profile'>
        <PanelHeader 
          direction = 'right' 
          title = '用户信息'
          close = { this.props.close }
        />
        <div className = 'user-profile-wrap'>
          <ProfileSection>
            <div className = 'avatar-wrap'>
              <Avatar src = { avatar }>
                <span className = 'online'>{ onlineState ? '在线' : '离开' }</span>
              </Avatar>              
            </div>
            <span className = 'nickname'>{ nickname }</span>
            <span className = 'createAt'>Create at{ this.state.createAt }</span>
          </ProfileSection>
        
          <ProfileSection>
            <ul className = 'info'>
              <li><span>性别</span> <span>{ sex }</span></li>
              <li><span>坐标</span> <span>{ place }</span></li>
            </ul> 
          </ProfileSection>
          <ProfileSection hover = { true }>
            <div className = 'delsession'
              onClick = { () => this.props.delChatting(this.props.chatting._id) }
            ><span></span><span>删除会话</span></div>
          </ProfileSection>
        </div>
      </div>
    )
  }
}
export default UserProfile;