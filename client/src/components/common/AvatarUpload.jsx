import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import Avatar from './Avatar';
import '../../assete/scss/AvatarUpload.scss';

class AvatarUpload extends Component {
  constructor (props) {
    super(props);   
    this.state = { src : this.props.src };
  }
  componentWillReceiveProps (nextProps) {  
    if(nextProps.src !== this.props.src) {
      this.setState({ src: nextProps.src});
    }
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
    const { setAvatar, size = 12 } = this.props;
    return (
      <div  style = {{width: size + 'rem', height: size + 'rem'}}  className='avatar-upload'>
        <Avatar src = { this.state.src } size = { size }/>
        <input type = 'file' className = 'upload'
          onChange = { this.handleChange }
        />
        <div className = 'mask'></div>
      </div>
    )  
  }
}

export default AvatarUpload;