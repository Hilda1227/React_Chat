import React,{ Component } from 'react';
import { connect } from 'react-redux';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { toggleRightPanel } from '../../redux/actions/pageUI';
import UserProfile from '../../containers/chat/UserProfile';
import GroupProfile from '../../containers/chat/GroupProfile';


const RightPanel = ({ rightPanelIs, showRightPanel, toggleRightPanel }) => {
  function show (value) {
    switch (value) {
      case 'UserProfile': return <UserProfile close = { toggleRightPanel } />;
      case 'GroupProfile': return <GroupProfile close = { toggleRightPanel } />;
      default: null;
    }
  }
  return (
    <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
     { showRightPanel ? (<div className = 'right-panel'>{ show(rightPanelIs) }</div>) : null}
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
