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
  componentDidMount (props) {
    const {chatting, nextChatting, getHistory} = this.props;
    getHistory({
        ...chatting.toJS(),
        token: localStorage.getItem('token')
    });
  }

  render () {
    const {chatting, closeChatting, nextChatting} = this.props;
    return (
      <div className = { `room-header${chatting.isEmpty() ? '-hidden' : ''}` }>
        <div className = 'room-header-wrap'>
        <img className = 'avatar' src = { chatting.get('avatar') }></img>
          {/*<div id = 'menu'></div>*/}
          <span className = 'nickname'>{ chatting.get('to') || '' }</span>
          <div id = 'target'></div>
        </div>
      </div>
    )
  }
}



export default RoomHeader