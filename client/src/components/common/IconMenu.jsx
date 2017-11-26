import React, {Component} from 'react';
import '../../assete/scss/IconMenu.scss';
import { autobind } from 'core-decorators';

class IconMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isShow: false,
      style: {}
    }
  }
  @autobind
  toggleShow (e) {
    
    if(this.state.isShow){
      this.setState({ isShow: false });
    } 
    else {
      let x     = e.pageX, 
          y     = e.target.pageY,
          winX  = window.innerWidth, 
          winY  = window.innerHeight,
          width = this.props.width || 180,
          size  = this.props.size || 20,
          distence = 5,
          pX = distence + size,
          pY = pX,
          dX = winX / 2 > x ? 'left' : 'right',
          dY = winY / 2 > y ? 'bottom' : 'top'; 
      let style = {
        width: width + 'px',
        [dX]: pX + 'px',
        [dY]: pY + 'px' 
      };
      this.setState({ isShow: true, style });
    }
  }
  render () {
    const { iconClassName, children } = this.props;
    return (
      <div  onClick = { this.toggleShow }  className = 'icon-menu'>
        <i className = { iconClassName }></i>       
        { 
          this.state.isShow &&
          (<div className = 'menu-wrap' style = { this.state.style }>
            { children }
          </div>) 
        }
      </div>
    )
  }
}

export default IconMenu;