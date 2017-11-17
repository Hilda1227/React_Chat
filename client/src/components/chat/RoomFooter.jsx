import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { socketEmit } from '../../redux/actions/common';
import { uploadFile, fileInfo } from '../../util/upload';
import { createMessage } from '../../util/message';
import '../../assete/scss/RoomFooter.scss';


class RoomFooter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isShow: false
    };
  }
  @autobind
  toggleMorePanel () {
    this.state.isShow 
      ? this.setState({isShow: false})
      : this.setState({isShow: true});
  }
  @autobind
  sendFile (e) {
    const { chatting, user, addMessageItem } = this.props;
    let file = e.target.files[0];
    createMessage(file, 'file')
  }
  @autobind
  sendText (e) {
    if(e.keyCode === 13){
      createMessage(this.input.value, 'text');
      this.input.value = '';
    }   
  }
  render () {
    const { chatting, user, addMessageItem } = this.props;
    return (
      <div className = 'room-footer'>
        <div className = 'footer-wrap'>
          <input  placeholder = '说点啥呗~' type = 'text'
            ref={ (node) => this.input = node }
            onKeyDown = { this.sendText } 
          />
          <div  onClick = { this.sendText } className = 'tool' id = 'send'></div>
          <div  className = 'tool' id = 'emoji'></div>
          <div  onClick = { this.toggleMorePanel } className = 'tool' id = 'more'></div>
        </div>     
        <ul className =  {`more more${this.state.isShow ? '' : '-hidden'}`}>
          <li className = 'button-item' id = 'button-file'><input type = 'file' 
            onChange = { this.sendFile }/>
          </li>
        </ul> 
      </div>
    )
  }
}


export default RoomFooter;