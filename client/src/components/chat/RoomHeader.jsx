import React, {Component} from 'react'
import '../../assete/scss/RoomHeader.scss'

class RoomHeader extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {chatting, closeChatting} = this.props;
    return (
      <div className = { `room-header${chatting.isEmpty() ? '-hidden' : ''}` }>
        <div className = 'room-header-wrap'>
        <div style = {{backgroundImage: `url(${chatting.get('avatar')})`}} className = 'avatar'></div>
          <span className = 'nickname'>{ chatting.get('to') || '' }</span>
          <div id = 'target'></div>
        </div>
      </div>
    )
  }
}



export default RoomHeader