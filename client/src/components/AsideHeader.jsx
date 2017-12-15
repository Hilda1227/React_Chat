import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import '../assete/scss/AsideHeader.scss';
import IconMenu from './common/IconMenu';

class AsideHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showList: false
    }
  }
  @autobind
  toggleShow () {
    this.state.showList 
      ? this.setState({showList: false})
      : this.setState({showList: true});
  }
  @autobind
  logout () {
    localStorage.setItem('token', null);
    window.location.href='/login';
    this.props.clearUser();
  }
  render () {
    const { selectLeftPanel } = this.props;
    return (
      <div className = 'aside-header'>
        <div className = 'avatar' style = {{backgroundImage: `url(${this.props.user.get('avatar')})`}}></div>
        <span  className = 'icon-menu-wrap'>
          <IconMenu iconClassName = 'icon-menu-1'>
            <ul className = 'menu-list'>
              <li className = 'list-item' onClick = { selectLeftPanel('createGroup') }>创建群组</li>
              <li className = 'list-item' onClick = { selectLeftPanel('modifyInfo') }>修改资料</li>
              <li className = 'list-item' onClick = { this.logout }>登出</li>
            </ul>
          </IconMenu>      
        </span>
      </div>
    )
  }
}

export default AsideHeader
