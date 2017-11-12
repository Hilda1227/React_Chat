import React, { Component }from 'react';
import '../../assete/scss/RoomMsg.scss';
import RoomMsgItem from './RoomMsgItem';

class RoomMsg extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const lists = this.props.messages.map((item, index) => (
      <RoomMsgItem
        {...item.toJS()}
        key = { item.get('id') }
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