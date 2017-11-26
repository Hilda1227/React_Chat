import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import Avatar from '../common/Avatar';
import '../../assete/scss/ModifyInfo.scss';
import { modifyInfo } from '../../util/upload';
import LeftHeader from '../common/LeftHeader';
import Loading from '../common/Loading';
import ProfileSection from '../common/ProfileSection';
import EditableInput from '../common/EditableInput';
import SubmitButton from '../common/SubmitButton';

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
  setAvatar (value) {
    this.setState({ avatar: value })
  }
  @autobind
  handleChange (prop) {
    return (e) => {
      this.setState({ [prop]: e.target.value});
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
        <LeftHeader title = '修改资料' />
        <div className = 'panel-wrap'>
          <div className = 'panel-wrap-slide'>
            { this.state.isLoading && <Loading/> }
            <Avatar 
              setAvatar = { this.setAvatar }  
              src = { this.state.avatar } 
              size = '10' 
            />
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
              <label>男<input type = 'radio' onChange = { this.handleChange('sex') } checked = { this.state.sex == '男' } value = '男'/></label>
              <label>女<input type = 'radio' onChange = { this.handleChange('sex') } checked = { this.state.sex == '女' } value = '女'/></label>
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
