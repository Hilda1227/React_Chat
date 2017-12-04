import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DelayAnimation extends Component {
  constructor (props) {
    super(props);
    this.state = { isShow: false }
  }
  componentDidMount () {
    this.timer = setTimeout( () => this.setState({ isShow: true }), this.props.delay );
  }
  componentWillUnmount () {
    this.timer && clearTimeout( this.timer );
  }
  render () {
    const { children, name, timeout } = this.props;
    return (
      <ReactCSSTransitionGroup 
        transitionName= { name } 
        transitionEnterTimeout={ timeout || 500 } 
        transitionLeaveTimeout={ timeout || 500 }
      >
        { (this.state.isShow && children) ? children : null }
      </ReactCSSTransitionGroup>
    )
  }
}
export default DelayAnimation;