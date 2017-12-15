import React, { Component } from 'react';
import PanelHeader from './common/PanelHeader';
import ProfileSection from './common/ProfileSection';
import EditableInput from './common/EditableInput';
import { socketEmit } from '../redux/actions/common.js';
import { autobind } from 'core-decorators';
import { modifyGroupInfo } from '../util/upload';
import AvatarUpload from './common/AvatarUpload';
import Avatar from './common/Avatar';
import Loading from './common/Loading';
import DelayAnimation from './common/DelayAnimation';
import '../assete/scss/GroupProfile.scss';
import { formatCompleteDate } from '../util/date.js';

class GroupProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editable: false,     
      nickname: '',
      avatar:'',
      creator: {},
      count: 0,
      createAt: '',
      describe: '',
      isLoading: false
    }
  }
  
  @autobind
  handleChange (prop) {
    return val => {
      this.setState({ [prop]: val})
    }   
  }
  componentDidMount () {
    socketEmit('fetch group info', { _id: this.props.chatting._id })
    .then(data => {
      this.setState({
        ...data.info,
        editable: data.info.creator._id === this.props.user_id
      })
      this.preAvatar = data.info.avatar;
    })
  }

  @autobind
  referModify () {
    this.setState({isLoading: true});
    let { nickname, avatar, describe } = this.state;
    let info = { nickname, describe, user_id: this.props.user_id, _id: this.props.chatting._id };
    if( avatar !== this.avatar ) info.avatar = avatar;
    modifyGroupInfo(info)
    .then(res => {
      this.props.updateModify({ ...res.data.msg.group});
      this.setState({isLoading: false});
      this.props.close();
    })
  }
  
  render () {
    const { nickname, avatar, creator, count, createAt, describe, editable, isLoading } = this.state;
    const { chatting, quitGroup, close } = this.props;
    return (
      <div className='group-profile'>
        <PanelHeader 
          direction = 'right' 
          title = '群组信息'
          close = { close }
        />
        { isLoading && <Loading top = { 5 } /> }
        <div className = 'group-profile-wrap'>
          <div className = 'group-profile-slide'>
            <ProfileSection>
              <div className = 'avatar-wrap'>
                <DelayAnimation  name = 'Avatar' delay = { 100 }>               
                  {
                    editable 
                    ?(
                      <AvatarUpload
                        src = { this.state.avatar }
                        setAvatar = { this.handleChange('avatar') }
                      />
                    )
                    : <Avatar src = { this.state.avatar } />
                  }
                </DelayAnimation>
              </div>
              <EditableInput
                editable = { editable }
                defaultValue = { nickname }
                handleChange = { this.handleChange('nickname') }
                maxLength = { 15 }
              />
              <span className = 'createAt'>Create at { formatCompleteDate(this.state.createAt, '/') }</span>
            </ProfileSection>
            <ProfileSection title = '群介绍'>           
              <EditableInput
                editable = { editable }
                defaultValue = { describe }
                handleChange = { this.handleChange('describe') }
                maxLength = { 35 }
              />            
            </ProfileSection>
            <ProfileSection title = '群组成员'>           
              <ul className = 'group-member'>
                <li><span>人数</span> <span>{ count }</span></li>
                <li><span>管理员</span> <span>{ creator.nickname }</span></li>
              </ul>           
            </ProfileSection>
            { editable 
              && (
                <ProfileSection hover = { true }>           
                  <div  className = 'submit' onClick = { this.referModify } ><span></span> <span>提交修改</span></div>             
                </ProfileSection>
              ) 
            }  
            <ProfileSection hover = { true }>           
              <div  className = 'quit' onClick = { () => quitGroup( chatting._id ) } ><span></span> <span>退出该群</span></div>              
            </ProfileSection>         
          </div>
        </div>
      </div>
    )
  }
}
export default GroupProfile;