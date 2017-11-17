import React, { Component } from 'react';
import TextMessageItem from './TextMessageItem';
import FileMessageItem from './FileMessageItem';
import '../../assete/scss/MessageItemBox.scss';
import { formatDate } from '../../util/date.js'

class MessageItemBox extends Component{
  constructor (props) {
    super(props)
  }
  render () {
    const {sender, avatar, content, createAt, isSelf, msgType} = this.props;
    let message;
    switch(msgType){
      case 'text': {
        message = <TextMessageItem content = { content }/>;
        break;
      }
      case 'file': {
        message = <FileMessageItem content = { content }/>;
        break;
      }
      default:
        message = null;
    }
    return (
      <div className = { `room-msg-item room-msg-item${ isSelf ? '-self' : '-other' }`  }>
        <img src = { avatar } className = 'avatar'/>
        <div className = 'msg'>
          <div className = 'top'>
            <span className = 'sender'> { sender } </span> 
            <time> { formatDate(createAt) } </time>
          </div>
          { message }                      
        </div>
      </div>
    )
  }
}


export default MessageItemBox;