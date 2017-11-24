import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import Avatar from '../common/Avatar';
import '../../assete/scss/CreateGroup.scss';
import config from '../../config/serverConfig';
import { createGroup } from '../../util/upload';
import LeftHeader from '../common/LeftHeader';

class CreateGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      avatar: config.DEFAULT_GROUP_URL,
      nickname: '',
      describe: ''
    }
  }
  @autobind
  setAvatar (value) {
    this.setState({ avatar: value })
  }
  @autobind
  handleChange (prop) {
    return e => {
      this.setState({ [prop]: e.target.value})
    }   
  }
  @autobind
  handleSubmit () {
    let { nickname, avatar } = this.state;
    if(nickname.length < 2 || nickname.length > 10){      
      return alert('请输入合法的群组名');
    }
    let info = {
      nickname: this.state.nickname,
      describe: this.state.describe,
      avatar: this.state.avatar === config.DEFAULT_GROUP_URL
              ? '' : this.state.avatar,
      _id: this.props._id
    };
    createGroup(info);
  }
  render () {
    return (
      <div className = 'left-panel-wrap create-group'>
        <LeftHeader
          title = '创建群组'
          close = { this.props.close }
        />
        <div className = 'avatar-wrap'>
          <Avatar
            setAvatar = { this.setAvatar }
            src = { this.state.avatar }
          />
        </div>
        <div className = 'editor'>
          <input className = 'editor-name'
            onChange = { this.handleChange('nickname') }
            value = { this.state.nickname }
            placeholder = '请填写群名称（2~10个字）'
          />
          <input className = 'editor-describe'
            onChange = { this.handleChange('describe') }
            value = { this.state.describe }
            placeholder = '群介绍（0~30个字）'
          />
        </div>
        <button className = 'submit'  onClick = { this.handleSubmit } >提交</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({_id: state.user.get('_id')})
)(CreateGroup);
