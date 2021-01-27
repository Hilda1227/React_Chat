import { Component } from 'react'
import { connect } from 'react-redux'
import AsideHeader from '../components/AsideHeader'
import { selectLeftPanel, setThemeColor } from '../redux/actions/pageUI'
import { clearUser } from '../redux/actions/user'

function mapStateToProps (state) {
  return {
    user: state.user,
    themeColor: state.pageUI.get('themeColor')
  }
}
function mapDispatchToProps (dispatch) {
  return {
    selectLeftPanel: payload => () => dispatch(selectLeftPanel(payload)),
    clearUser: () => dispatch(clearUser()),
    setThemeColor: payload => () => dispatch(setThemeColor(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsideHeader)
