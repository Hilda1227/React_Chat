import React, { Component } from 'react'
import '../../assete/scss/Alert.scss';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hiddenAlert } from '../../redux/actions/pageUI';

class Alert extends Component {
  constructor (props) {
    super(props);
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.showAlert === true)
    setTimeout(this.props.hiddenAlert, 2000);
  }
  render () {
    return (    
      <ReactCSSTransitionGroup transitionName="Alert" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        { this.props.showAlert 
          && (<div className='alert'> <span>{ this.props.alertContent }</span></div>)
        }
      </ReactCSSTransitionGroup> 
    )
  }
}

export default connect(
  state => ({
    showAlert: state.pageUI.get('showAlert'),
    alertContent: state.pageUI.get('alertContent'),
  }),
  dispatch => {
    return {
      hiddenAlert: () => dispatch(hiddenAlert())
    }
  }
)(Alert);