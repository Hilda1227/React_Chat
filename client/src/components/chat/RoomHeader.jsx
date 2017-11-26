import React, {Component} from 'react';
import '../../assete/scss/RoomHeader.scss';
import IconMenu from '../common/IconMenu';

class RoomHeader extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {chatting, delChatting, quitGroup} = this.props;
    const { type, _id } = this.props.chatting.toJS();
    let list;
    
    
    return (
      
      <div className = 'room-header'>
        <div className = 'room-header-wrap'>       
          <div style = {{ backgroundImage: `url(${chatting.get('avatar') })`}} className = 'avatar'></div>
          <span className = 'nickname'>{ chatting.get('to') }</span>
          <div className = 'target'>
            <IconMenu iconClassName = 'icon-menu-2'>
              <ul className = 'menu-list'>
                <li className = 'list-item'>查看资料</li>
                {
                  chatting.get('type') === 'private'
                  ? <li className = 'list-item' onClick = { () => delChatting(_id) }>删除对话</li>
                  : <li className = 'list-item' onClick = { () => quitGroup(_id) }>退出该群</li>
                }                
              </ul>
            </IconMenu>
          </div>
        </div>
      </div>
    )
  }
}



export default RoomHeader