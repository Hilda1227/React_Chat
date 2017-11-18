import React, { Component }from 'react';
import { autobind } from 'core-decorators';
import '../../assete/scss/RoomMsg.scss';
import MessageItemBox from './MessageItemBox';

class RoomMsg extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false
    }
    this.limit = 8;
  }
  initHistory(chatting) {   
    return this.props.initHistory({
      ...chatting.toJS(),
      limit: this.limit,
      token: localStorage.getItem('token')
    });
  }

  @autobind
  addHistory () {
    this.props.addHistory({
      ...this.props.chatting.toJS(),
      limit: this.limit,
      token: localStorage.getItem('token')
    })
  }

  componentDidMount () {
    this.initHistory(this.props.chatting)
    .then(() => {this.room.scrollTop = this.room.scrollHeight - this.room.clientHeight;})
  }

  componentWillReceiveProps (nextProps) {  
    if(!this.props.chatting.equals( nextProps.chatting )) {
      this.initHistory(nextProps.chatting)
      .then(() => {this.room.scrollTop = this.room.scrollHeight - this.room.clientHeight;})
    }
  }

  @autobind
  handleScroll () {
    if(this.room.scrollTop <= 0) {
      this.props.setLoading(true);
      this.addHistory();
    }
  }
  render () {
    const messages = this.props.messages.map((item, index) => (
      <MessageItemBox
        {...item.toJS()}
        isSelf = { this.props.user == item.get('sender') }       
        key = { item.get('_id') || index}
      />
    ));
    return (
      <div className = 'room-msg' 
        onScroll = { this.handleScroll } 
        ref = {node => this.room = node}
      >
        <div className = 'room-msg-wrap' >{ messages }</div>
      </div>
    )
  }
}


export default RoomMsg