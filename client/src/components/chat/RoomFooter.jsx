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
  }
  
  render () {
    return (
      <div className = 'room-footer'>
        <div className = 'footer-wrap'>
          <input  placeholder = '说点啥呗~' type = 'text'
            ref={ (node) => this.input = node }
            onKeyDown = { this.sendText } 
          />
          <div  onClick = { this.sendText } className = 'tool' id = 'send'></div>
          <div  onClick = { () => {this.togglePanel('showExpressions')} } className = 'tool' id = 'emoji'></div>
          <div  onClick = { () => {this.togglePanel('showTools')} } className = 'tool' id = 'more'></div>
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