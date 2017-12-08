import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import '../../assete/scss/EditableInput.scss';

class EditableInput extends Component {
  constructor (props) {
    super(props);  
    this.state = {
      isFocus : false,
      value: this.props.defaultValue || '',
    };
  }
  componentWillReceiveProps (nextProps) {  
    if(nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({ value: nextProps.defaultValue});
    }
  }
  @autobind
  setFocus () {
    this.state.isFocus 
    ? this.setState({isFocus: false})
    : this.setState({isFocus: true})
  }
  @autobind
  handleChange (e) {
    this.setState({ value: e.target.value });
    this.props.handleChange(e.target.value);
  }
  render () {
    const { editable = true, placeholder, maxLength, minLength, type = 'text' } = this.props;
    return (
    <div className = {`editable-input editable-input${this.state.isFocus ? '-focus' : ''}`}>
      <input 
        ref = { node => this.input = node }
        disabled = { editable ? null : 'disabled' }
        placeholder = { editable && placeholder ? placeholder : null}
        type = { type }
        maxLength = { maxLength ? maxLength : null }
        minLength = { minLength ? minLength : null }
        onFocus = { this.setFocus }
        onBlur = { this.setFocus }
        onChange = { this.handleChange }
        value = { this.state.value }
      ></input>
      <span className = 'icon'>
       { !this.state.isFocus && editable &&  <i className = 'editable' onClick = { () => {this.input.focus()} }></i> }
       { maxLength && this.state.isFocus && editable && (<span className = 'rest'>{ maxLength-this.state.value.length }</span>) }
      </span>
    </div>
  )
  }
}

export default EditableInput;
