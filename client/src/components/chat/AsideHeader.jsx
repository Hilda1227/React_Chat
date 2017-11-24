import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import '../../assete/scss/AsideHeader.scss';

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
      <img className = 'avatar' src = { this.props.user.get('avatar') }/>
      <div  onClick = { this.toggleShow } className = 'icon' id = 'menu'>
        <ul className = {`menu-list menu-list${ this.state.showList ? '-show' : '-hidden' }`}>
          <li  onClick = { selectLeftPanel('createGroup') }>创建群组</li>
          <li onClick = { selectLeftPanel('addGroup') }>加入群组</li>
          <li onClick = { selectLeftPanel('modifyInfo') }>修改资料</li>
          <li onClick = { this.logout }>登出</li>
        </ul>
      </div>
    </div>
    )
  }
}

export default AsideHeader
