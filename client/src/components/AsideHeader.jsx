import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import '../assete/scss/AsideHeader.scss';
import IconMenu from './common/IconMenu';
import PropTypes from 'prop-types';

const ColorItem = function ({color, choose, themeColor}) {
  return <li className = {`${themeColor === color && 'checked'}`}
           style = {{ background: color }} 
           onClick = { choose }>
        </li>
}

class AsideHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showPanel: false
    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  @autobind
  toggleShow () {
    this.state.showPanel 
      ? this.setState({showPanel: false})
      : this.setState({showPanel: true});
  }
  @autobind
  logout () {
    localStorage.setItem('token', '');
    this.context.router.history.push("/login");
    this.props.clearUser();
  }
  render () {   
    const { selectLeftPanel, themeColor, setThemeColor } = this.props;
    this.colors = ['#e8bbc5', '#e56281', '#abcbf6', '#688af1', '#7ac5c4', '#cfbaaa', '#bdcddf', '#aaa'];
    return (
      <div className = 'aside-header' style = {{background: themeColor}}>
        <div className = 'avatar' style = {{backgroundImage: `url(${this.props.user.get('avatar')})`}}></div>
        <span className = 'skin' onClick = { this.toggleShow }>
          { this.state.showPanel && 
            <div className = 'skin-panel'>
              <span onClick = { this.toggleShow } className = 'close'></span>
              <h4>选择一种主题颜色</h4>
              <ul className = 'skins'>
                {this.colors.map(item => {
                    return <ColorItem  
                      color = { item } 
                      key = { item }
                      choose = { setThemeColor(item) }
                      themeColor = { themeColor }
                    />
                })}
              </ul>
            </div>
          }
        </span>
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
