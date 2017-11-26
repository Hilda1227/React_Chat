import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { socketEmit } from '../../redux/actions/common';
import { uploadFile, fileInfo } from '../../util/upload';
import { createMessage } from '../../util/message';
import '../../assete/scss/RoomFooter.scss';
import Expressions from './Expressions';


class RoomFooter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showTools: false,
      showExpressions: false
    };
  }

  @autobind
  togglePanel (prop) {
    this.state[prop] 
      ? this.setState({[prop]: false})
      : this.setState({[prop]: true});
  }

  @autobind
  sendFile (e) {
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

  @autobind
  addEmoji (value) {
    this.input.value += value;
    this.input.focus();
  }
  
  render () {
    return (
      <div className = 'room-footer'>
        <div className = 'footer-wrap'>
          <div className = 'send'>
            <input  placeholder = '说点啥呗~' type = 'text'
              ref={ (node) => this.input = node }
              onKeyDown = { this.sendText } 
            />
            <button onClick = { this.sendText } id = 'send'>发送</button>
          </div>
          <div className = 'tool'>
            <span  onClick = { () => {this.togglePanel('showExpressions')} } id = 'emoji'></span>
            <span  onClick = { () => {this.togglePanel('showTools')} } id = 'more'></span>
          </div>
        </div>   

        <ul className =  {`more more${this.state.showTools ? '' : '-hidden'}`}>
          <li className = 'button-item' id = 'button-file'><input type = 'file' 
            onChange = { this.sendFile }/>
          </li>
        </ul>
        <Expressions
          isShow = { this.state.showExpressions }
          onClick = { this.addEmoji }
        /> 
      </div>
    )
  }
}


export default RoomFooter;