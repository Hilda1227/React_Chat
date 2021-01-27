import { Component } from 'react'
import { connect } from 'react-redux'
import { selectLeftPanel } from '../redux/actions/pageUI'

import ActiveList from '../components/ActiveList'

function mapStateToProps (state) {
  return {
    activeList: state.activeList,
    curRoom: state.chatting.get('_id')
  }
}
function mapDispatchToProps (dispatch) {
  return {
    selectLeftPanel: payload => dispatch(selectLeftPanel(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveList)
