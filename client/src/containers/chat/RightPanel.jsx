import React,{ Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toggleRightPanel } from '../../redux/actions/pageUI';
import UserProfile from '../../containers/chat/UserProfile';
import GroupProfile from '../../containers/chat/GroupProfile';


const RightPanel = ({ rightPanelIs, showRightPanel, toggleRightPanel }) => {
  function show (value) {
    switch (value) {
      case 'UserProfile': return (<div className = 'right-panel'><UserProfile close = { toggleRightPanel } /></div>);
      case 'GroupProfile': return (<div className = 'right-panel'><GroupProfile close = { toggleRightPanel } /></div>);
      default: null;
    }
  }
  return (
    <ReactCSSTransitionGroup transitionName="Right" 
      transitionEnterTimeout={250} 
      transitionLeaveTimeout={250}
    >
      { showRightPanel ? show(rightPanelIs) : null}
    </ReactCSSTransitionGroup>
  )
}

function mapStateToProps(state) {
  return {
    rightPanelIs: state.pageUI.get('rightPanelIs'),
    showRightPanel: state.pageUI.get('showRightPanel'),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleRightPanel: () => dispatch(toggleRightPanel())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
