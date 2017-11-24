import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import Avatar from '../common/Avatar';
import '../../assete/scss/ModifyInfo.scss';
import { modifyInfo } from '../../util/upload';
import LeftHeader from '../common/LeftHeader';

class ModifyInfo extends Component {
  constructor (props) {
    super(props);
    let {avatar, nickname, sex, place} = this.props.user;
    this.state = {avatar, nickname, sex, place};
  }
  @autobind
  setAvatar (value) {
    this.setState({ avatar: value })
  }
  @autobind
  handleChange (prop) {
    return (e) => {
      let value = e.target.value;
      if(value.length <= 15 && value.length >= 0)
        this.setState({ [prop]: value});
    }
  }
  @autobind
  handleSubmit () {
    let {avatar, nickname, sex, place} = this.state;
    let info = {nickname, sex, place, _id: this.props.user._id};
    info.avatar = avatar === this.props.user.avatar ? null : avatar;
    modifyInfo(info);
  }
  render () {
    return (
      <div className = 'left-panel-wrap modify-info'>
        <LeftHeader
          title = '修改资料'
          close = {this.props.close}
        />
        <div className = 'avatar-wrap'>
          <Avatar setAvatar = { this.setAvatar }  src = { this.state.avatar }/>
        </div>
        <ul className = 'editor'>
          <li>
            <label htmlFor = 'nickname'>昵称</label>
            <input id = 'nickname' onChange = { this.handleChange('nickname') } value = { this.state.nickname }/>
          </li>
          <li>
            <label htmlFor = 'place'>坐标</label>
            <input id = 'place' onChange = { this.handleChange('place') } value = { this.state.place }/>
          </li>
          <li>           
            <label>男<input name = 'sex' onChange = { this.handleChange('sex') } checked = { this.state.sex == '男' } value = '男' type = 'radio'/></label>
            <label>女<input name = 'sex' onChange = { this.handleChange('sex') } checked = { this.state.sex == '女' } value = '女' type = 'radio'/></label>
          </li>
        </ul>
        <button className = 'submit'  onClick = { this.handleSubmit } >提交</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({user: state.user.toJS()})
)(ModifyInfo);
