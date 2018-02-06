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
          y     = e.pageY,
          winX  = window.innerWidth, 
          winY  = window.innerHeight,
          width = this.props.width || 160,
          size  = this.props.size || 20,
          distence = 0,
          pX = distence + size,
          pY = pX,
          dX = winX / 2 > x ? 'left' : 'right',
          dY = winY / 2 > y ? 'top' : 'bottom'; 
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
    let size = this.props.size || 20 + 'px';
    return (
      <div  onClick = { this.toggleShow }  
        className = 'icon-menu' 
        style = {{width: size, height: size}}
      >
        <span className = { 'icon ' + iconClassName } style = {{ width: size, height: size  }}></span>       
        { 
          this.state.isShow 
          && 
          <div className = 'menu-wrap' style = { this.state.style }>
            { children }
          </div>
        }
      </div>
    )
  }
}

export default IconMenu;