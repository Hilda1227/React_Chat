import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import InputForm from './InputForm';
import { socketEmit } from '../../redux/actions/common'
import '../../assete/scss/Group.scss'

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: false,
      join: false
    }
  }

  @autobind
  show (prop) {
    this.setState({[prop]: true})
  }

  @autobind
  close () {
    this.setState({create: false, join: false})
  }

  createGroup (value) {
    socketEmit('create group', {_id: this.props._id, nickname: value, token: localStorage.getItem('token')})
    .then( (data) => console.log('创建成功',data.group)  )
    .catch( err => console.log(err) )
  }

  joinGroup (value) {
    socketEmit('join group', {_id: this.props._id, nickname: value, token: localStorage.getItem('token')})
    .then( (data) => console.log('加入成功',data.group)  )
    .catch( err => console.log(err) )
  }

  @autobind
  onSubmit (value) {
    if(this.state.create){
      this.createGroup (value)
    }else if(this.state.join){
      this.joinGroup (value)
    }
  }

  render() {
    return (
      <div className = 'group'>
        <div id = 'create-group' onClick = { () => {this.show('create')} }>创建群组</div>
        <div id = 'join-group' onClick = { () => {this.show('join')} } >加入群组</div>
        <InputForm 
          { ...this.state } 
          onSubmit = { this.onSubmit }
          close = { this.close }
        />
      </div> 
    )
  }
}
export default Group;

