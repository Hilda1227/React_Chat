import React, {Component} from 'react'
import '../../assete/scss/RoomHeader.scss'

class RoomHeader extends Component {
  constructor (props) {
    super(props);
  }
  componentWillReceiveProps (nextProps) {  
    const {chatting, nextChatting, getHistory} = this.props;
    
    if( !this.props.nextChatting.equals( nextProps.nextChatting ) ) {
      nextProps.setChatting(nextProps.nextChatting);
    }   
    if(!chatting.equals( nextProps.chatting )) {
      console.log('调用history')
      getHistory({
        ...nextProps.chatting.toJS(),
        token: localStorage.getItem('token')
      });
    }
  }

  render () {
    const {chatting, closeChatting, nextChatting} = this.props;
    return (
      <div className = { `room-header${chatting.isEmpty() ? '-hidden' : ''}` }>
        <div className = 'room-header-wrap'>
          <div id = 'close' onClick = { () => { 
            closeChatting({ nickname: chatting.get('to'), type: chatting.get('type') });       
           }}>
          </div>
          <span>{ chatting.get('to') || '' }</span>
          <div id = 'sendTo'></div>
        </div>
      </div>
    )
  }
}



export default RoomHeader