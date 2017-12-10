import React, { Component }from 'react';
import { socket } from '../../redux/actions/common'
import { autobind } from 'core-decorators';
import Loading from '../common/Loading';
import '../../assete/scss/RoomMsg.scss';
import MessageItemBox from './MessageItemBox';

class RoomMsg extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      preHeight: 0,
    }
    this.limit = 20;
    this.needScroll = false;
  }
  @autobind
  scrollToBottom () {
    this.room.scrollTop = this.room.scrollHeight - this.room.clientHeight;
  }
  initHistory(chatting) {  
    this.setState({ isLoading: true }); 
    return this.props.initHistory({
      ...chatting.toJS(),
      limit: this.limit,
      token: localStorage.getItem('token')
    })
    .then(() => {this.setState({
      preHeight: this.room.scrollHeight,
      isLoading: false
    })})
  }
  addHistory () {
    this.setState({
      preHeight: this.room.scrollHeight,
      isLoading: true
    });
    return this.props.addHistory({
      ...this.props.chatting.toJS(),
      limit: this.limit,
    })
  }
  componentDidMount () {
    this.initHistory(this.props.chatting)
    .then(() => {this.scrollToBottom()})
  }
  componentDidUpdate () {
    if(this.needScroll) this.scrollToBottom();
    this.needScroll = false;
  }

  componentWillReceiveProps (nextProps) {  
    if(!this.props.chatting.equals( nextProps.chatting )) {
      return this.initHistory(nextProps.chatting)
        .then(() => {this.scrollToBottom()})
    }
    if(this.room.scrollHeight - this.room.clientHeight - this.room.scrollTop < 20){    
      return this.needScroll = true;
    }
    if( nextProps.messages.last() && nextProps.messages.last().get('sender') === this.props.user){
      this.needScroll = true;
    }
  }

  @autobind
  handleScroll (e) {
    e.persist()  // 如果要以异步方式访问事件属性，则应该在事件上调用event.persist()
    if(this.room.scrollTop <= 0) {
      this.addHistory()
      .then(() => {
        let height = e.target.scrollHeight;
        this.room.scrollTop = height - this.state.preHeight;
        this.setState({ isLoading: false });
      })
    }
  }

  render () {
    const messages = this.props.messages.map((item, index) => (
      <MessageItemBox
        {...item.toJS()}
        isSelf = { this.props.user === item.get('sender') }       
        key = { item.get('_id') || index}
      />
    ));
    return (
      <div className = 'room-msg' 
        onScroll = { this.handleScroll } 
        ref = {node => this.room = node}
      >
        { this.state.isLoading && <Loading/> }
        <div className = 'room-msg-wrap' >
          <div className = 'room-msg-slide' >{ messages }</div>
        </div>
      </div>
    )
  }
}


export default RoomMsg