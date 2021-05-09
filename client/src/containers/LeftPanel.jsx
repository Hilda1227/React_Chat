import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../assete/scss/LeftPanel.scss'
import { toggleLeftPanel } from '../redux/actions/pageUI'
import CreateGroup from '../components/CreateGroup'
import JoinGroup from '../components/JoinGroup'
import ModifyInfo from '../components/ModifyInfo'
import AddPrivate from '../components/AddPrivate'

const LeftPanel = ({ leftPanelIs, showLeftPanel, toggleLeftPanel }) => {
  function show (value) {
    switch (value) {
      case 'createGroup': return <CreateGroup close={toggleLeftPanel} />
      case 'addGroup': return <JoinGroup close={toggleLeftPanel} />
      case 'modifyInfo': return <ModifyInfo close={toggleLeftPanel} />
      case 'addPrivate': return <AddPrivate close={toggleLeftPanel} />
      default: null
    }
  }
  return (
    <ReactCSSTransitionGroup transitionName='Left' transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      {showLeftPanel ? show(leftPanelIs) : null}
    </ReactCSSTransitionGroup>
  )
}

function mapStateToProps (state) {
  return {
    leftPanelIs: state.pageUI.getIn(['layout', 'leftPanelIs']),
    showLeftPanel: state.pageUI.getIn(['layout', 'showLeftPanel'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleLeftPanel: () => dispatch(toggleLeftPanel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel)
