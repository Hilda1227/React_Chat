import React,{ Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toggleRightPanel } from '../redux/actions/pageUI';
import UserProfile from '../containers/UserProfile';
import GroupProfile from '../containers/GroupProfile';


const RightPanel = ({ rightPanelIs, showRightPanel, toggleRightPanel }) => {
  function show (value) {
    switch (value) {
      case 'UserProfile': return <UserProfile close = { toggleRightPanel } />;
      case 'GroupProfile': return <GroupProfile close = { toggleRightPanel } />;
      default: null;
    }
  }
  return (
    <ReactCSSTransitionGroup 
      transitionName="Right" 
      transitionEnterTimeout={250} 
      transitionLeaveTimeout={250}
    >
      { showRightPanel ? show(rightPanelIs) : null}
    </ReactCSSTransitionGroup>
  )
}

function mapStateToProps(state) {
  return {
    rightPanelIs: state.pageUI.getIn(['layout', 'rightPanelIs']),
    showRightPanel: state.pageUI.getIn(['layout', 'showRightPanel']),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleRightPanel: () => dispatch(toggleRightPanel())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
