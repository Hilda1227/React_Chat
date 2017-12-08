import React,{ Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../assete/scss/LeftPanel.scss'
import { toggleLeftPanel } from '../../redux/actions/pageUI';
import CreateGroup from '../../components/group/CreateGroup';
import JoinGroup from '../../components/group/JoinGroup';
import ModifyInfo from '../../components/chat/ModifyInfo';
import AddPrivate from '../../components/chat/AddPrivate';

const LeftPanel = ({ leftPanelIs, showLeftPanel, toggleLeftPanel }) => {
  function show (value) {
    switch (value) {
      case 'createGroup': return <CreateGroup close = { toggleLeftPanel } />;
      case 'addGroup': return <JoinGroup close = { toggleLeftPanel } />;
      case 'modifyInfo': return <ModifyInfo close = { toggleLeftPanel } />;
      case 'addPrivate': return <AddPrivate close = { toggleLeftPanel } />;
      default: null;
    }
  }
  return (
    <ReactCSSTransitionGroup transitionName="Left" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
     { showLeftPanel ? show(leftPanelIs) : null}
    </ReactCSSTransitionGroup>  
  )
}


function mapStateToProps(state) {
  return {
    leftPanelIs: state.pageUI.get('leftPanelIs'),
    showLeftPanel: state.pageUI.get('showLeftPanel'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLeftPanel: () => dispatch(toggleLeftPanel())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
