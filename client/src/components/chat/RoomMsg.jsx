import React, { Component }from 'react';
import '../../assete/scss/RoomMsg.scss';
import MessageItemBox from './MessageItemBox';

class RoomMsg extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const lists = this.props.messages.map((item, index) => (
      <MessageItemBox
        {...item.toJS()}
        isSelf = { this.props.user == item.get('sender') }
        key = { item.get('_id') || index}
      />
    ));
    return (
      <div className = 'room-msg'>
        <div className = 'room-msg-wrap'>
          { lists }
        </div>
      </div>
    )
  }
}


export default RoomMsg