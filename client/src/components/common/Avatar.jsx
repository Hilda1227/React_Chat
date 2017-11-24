import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import '../../assete/scss/Avatar.scss';

class Avatar extends Component {
  constructor (props) {
    super(props);   
    this.state = { src : this.props.src };
  }
  @autobind
  handleChange (e) {
    let file = e.target.files[0],    
        reader  = new FileReader();
    this.props.setAvatar(file);
    if (file) reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      this.setState({src: reader.result});      
    }, false);     
  }
  render () {
    const { setAvatar } = this.props;
    return (
      <div className='avatar'>
        <div className = 'preview'
          style = {{ backgroundImage: `url(${this.state.src}` }} 
          ref = { node => this.preview = node }
        ></div>
        <input type = 'file' className = 'upload'
          onChange = { this.handleChange }
        />
        <div className = 'mask'></div>
      </div>
    )  
  }
}

export default Avatar;