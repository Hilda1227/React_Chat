import React, {Component} from 'react';
import '../assete/scss/RoomHeader.scss';
import IconMenu from './common/IconMenu';
import Avatar from './common/Avatar';

class RoomHeader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showMenu: false
    }
  }
  componentDidMount () {
    if(window.innerWidth <= 650) this.setState({showMenu: true});
    let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'; 
    this.handle = () => {
      if(window.innerWidth <= 650 && !this.state.showMenu ) {
        this.setState({showMenu: true})
      }else if(window.innerWidth > 650 && this.state.showMenu ) {
        this.setState({showMenu: false})
      }
    }
    window.addEventListener(resizeEvent, this.handle); 
  }

  componentWillUnmount () {
    let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.removeEventListener(resizeEvent, this.handle);
  }

  render () {
    const {chatting, delChatting, quitGroup, selectRightPanel} = this.props;
    const { type, _id } = this.props.chatting.toJS();
    let list;    
    return (      
      <div className = 'room-header'>
        <div className = 'room-header-wrap'>        
          {
            this.state.showMenu 
            ? <span className = 'close' onClick = { this.props.closeChatting } ></span>
            : <Avatar src = { chatting.get('avatar') }  size = '2.7rem' />
          }                
          <span className = 'nickname'>{ chatting.get('to') }</span>
          <div className = 'target'>
            <IconMenu iconClassName = 'icon-menu-2'size = { 15 } >
              {
                chatting.get('type') === 'private'
                ? (<ul className = 'menu-list'>
                    <li className = 'list-item' onClick = { () => selectRightPanel('UserProfile') }>用户信息</li>
                    <li className = 'list-item' onClick = { () => delChatting(_id) }>删除对话</li>
                  </ul>)
                : (<ul className = 'menu-list'>
                    <li className = 'list-item' onClick = { () => selectRightPanel('GroupProfile') }>群组信息</li>
                    <li className = 'list-item' onClick = { () => quitGroup(_id) }>退出该群</li>
                  </ul>)
              }
            </IconMenu>
          </div>
        </div>
      </div>
    )
  }
}



export default RoomHeader