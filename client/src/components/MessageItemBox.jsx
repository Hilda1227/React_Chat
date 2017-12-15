import React, { Component } from 'react';
import TextMessageItem from './TextMessageItem';
import FileMessageItem from './FileMessageItem';
import ImageMessageItem from './ImageMessageItem';
import '../assete/scss/MessageItemBox.scss';
import { formatDate } from '../util/date.js'

class MessageItemBox extends Component{
  constructor (props) {
    super(props);
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
      case 'image': {
        message = <ImageMessageItem content = { content }/>;
        break;
      }
      default:
        message = null;
    }
    let loading = (<div className = 'isLoading'><img src = 'https://ooo.0o0.ooo/2017/01/17/587dd9f639872.gif'/></div>);
    return (
      <div className = { `room-msg-item room-msg-item${ isSelf ? '-self' : '-other' }`  }>
        <div style = {{backgroundImage: `url(${avatar})`}} className = 'avatar'></div>
        <div className = 'msg'>
          <div className = 'top'>
            <span className = 'sender'> { sender } </span> 
            <time> { formatDate(createAt) } </time>
          </div>
          <div className = 'message'>{ this.props.isLoading && loading } { message }</div>                      
        </div>
      </div>
    )
  }
}


export default MessageItemBox;