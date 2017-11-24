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
        <img className = 'avatar' src = { chatting.get('avatar') }></img>
          <span className = 'nickname'>{ chatting.get('to') || '' }</span>
          <div id = 'target'></div>
        </div>
      </div>
    )
  }
}



export default RoomHeader