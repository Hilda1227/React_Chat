import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { socketEmit } from '../redux/actions/common';
import { uploadFile, fileInfo } from '../util/upload';
import { createMessage } from '../util/message';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../assete/scss/RoomFooter.scss';
import Expressions from './Expressions';

class RoomFooter extends Component {
  constructor (props) {
    super(props);
  }

  @autobind
  sendFile (e) {
    let file = e.target.files[0];
    createMessage(file, 'file')
  }

  @autobind
  sendText () {
    createMessage(this.input.value, 'text');
    this.input.value = '';   
  }

  @autobind
  sendImage (e) {
    let file = e.target.files[0];
    createMessage(file, 'image')
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
              onKeyDown = { (e)  => { if(e.keyCode === 13) this.sendText() } } 
            />
            <button onClick = { () => { this.sendText() } } id = 'send'>发送</button>
          </div>
          <div className = 'tool'>
            <span  onClick = { this.props.toggleExpressions } id = 'emoji'></span>
            <span  onClick = { this.props.toggleTools } id = 'more'></span>
          </div>
        </div>
        <div className = 'tool-panel'>
          <ReactCSSTransitionGroup transitionName="ToolPanel" transitionEnterTimeout={500} transitionLeaveTimeout={300}> 
            { 
              this.props.showTools 
              ? (<ul className = 'more'>
                  <li className = 'button-item' id = 'button-file'><input type = 'file' 
                    onChange = { this.sendFile }/>
                  </li>
                  <li className = 'button-item' id = 'button-image'><input type = 'file' 
                    accept = "image/*"  onChange = { this.sendImage }/>
                  </li>
                </ul>) 
              : null
            }
            { 
              this.props.showExpressions
              ? (<Expressions
                  onClick = { this.addEmoji }
                />)
              : null        
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}


export default RoomFooter;