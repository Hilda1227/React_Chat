import React, { Component }from 'react';
import { socket } from '../../redux/actions/common'
import { autobind } from 'core-decorators';
import '../../assete/scss/RoomMsg.scss';
import MessageItemBox from './MessageItemBox';

class RoomMsg extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      preHeight: 0,
    }
    this.limit = 8;
  }
  @autobind
  scrollToBottom () {
    this.room.scrollTop = this.room.scrollHeight - this.room.clientHeight;
  }

  initHistory(chatting) {   
    return this.props.initHistory({
      ...chatting.toJS(),
      limit: this.limit,
      token: localStorage.getItem('token')
    })
    .then(() => {this.setState({
      preHeight: this.room.scrollHeight
    })})
  }

  addHistory () {
    this.setState({preHeight: this.room.scrollHeight});
    return this.props.addHistory({
      ...this.props.chatting.toJS(),
      limit: this.limit,
      token: localStorage.getItem('token')
    })
  }

  componentDidMount () {
    this.initHistory(this.props.chatting)
    .then(() => {this.scrollToBottom()})
  }

  componentWillReceiveProps (nextProps) {  
    if(!this.props.chatting.equals( nextProps.chatting )) {
      this.initHistory(nextProps.chatting)
      .then(() => {this.scrollToBottom()})
    }
  }

  @autobind
  handleScroll (e) {
    e.persist()  // 如果要以异步方式访问事件属性，则应该在事件上调用event.persist()
    if(this.room.scrollTop <= 0) {
      this.props.setLoading(true);
      this.addHistory()
      .then(() => {
        let height = e.target.scrollHeight;
        this.room.scrollTop = height - this.state.preHeight;
      })
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