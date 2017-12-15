import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import AvatarUpload from './common/AvatarUpload';
import DelayAnimation from '../components/common/DelayAnimation';
import '../assete/scss/ModifyInfo.scss';
import { modifyInfo } from '../util/upload';
import PanelHeader from './common/PanelHeader';
import Loading from './common/Loading';
import ProfileSection from './common/ProfileSection';
import EditableInput from './common/EditableInput';
import SubmitButton from './common/SubmitButton';

class ModifyInfo extends Component {
  constructor (props) {
    super(props);
    let {avatar, nickname, sex, place} = this.props.user;
    this.state = {
      avatar, 
      nickname, 
      sex, 
      place,
      isLoading: false
    };
  }
  @autobind
  handleChange (prop) {
    return (val) => {
      this.setState({ [prop]: val});
    }
  }
  @autobind
  handleSubmit () {
    this.setState({isLoading: true});
    let {avatar, nickname, sex, place} = this.state;
    let info = {nickname, sex, place, _id: this.props.user._id};
    info.avatar = avatar === this.props.user.avatar ? null : avatar;
    modifyInfo(info)
    .then(() => {
      this.setState({Loading: false});
      this.props.close();
    })
  }
  render () {
    return (
      <div className = 'left-panel-wrap modify-info'>
        <PanelHeader title = '修改资料' close = { this.props.close } />
        { this.state.isLoading && <Loading top = { 5 } /> }
        <div className = 'panel-wrap'>
          <div className = 'panel-wrap-slide'>
            <ProfileSection>   
              <div className = 'avatar-wrap'>
                <DelayAnimation name = 'Avatar' delay = { 100 }>    
                <AvatarUpload
                  setAvatar = { this.handleChange('avatar') }
                  src = { this.state.avatar }
                  size = '12rem'
                />
                </DelayAnimation>
              </div>
            </ProfileSection>
            <ProfileSection title = '昵称'>
              <EditableInput
                defaultValue = { this.state.nickname }
                minLength = { 1 }
                maxLength = { 15 }
                handleChange = { this.handleChange('nickname') }
              />
            </ProfileSection>
            <ProfileSection title = '坐标'>
              <EditableInput
                defaultValue = { this.state.place }
                minLength = { 1 }
                maxLength = { 15 }
                handleChange = { this.handleChange('place') }
              />
            </ProfileSection> 
            <ProfileSection title = '性别'>
              <div>
                <label>男<input type = 'radio' onChange = { e => this.handleChange('sex')(e.target.value) } checked = { this.state.sex == '男' } value = '男'/></label>
                <label>女<input type = 'radio' onChange = { e => this.handleChange('sex')(e.target.value) } checked = { this.state.sex == '女' } value = '女'/></label>
              </div>
            </ProfileSection>
            <SubmitButton 
              disabled = { this.state.nickname.length < 1 || this.state.place.length < 1 } 
              isCircle = { true }
              onClick = { this.handleSubmit }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({user: state.user.toJS()})
)(ModifyInfo);
