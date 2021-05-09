import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleLeftPanel } from '../../redux/actions/pageUI'
import '../../assete/scss/PanelHeader.scss'

const PanelHeader = ({ direction = 'left', title, close, themeColor }) => {
  return (
    <div className='panel-header' style={{ backgroundColor: themeColor }}>
      <span onClick={close} className={`close-${direction}`} />
      <span>{title}</span>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    themeColor: state.pageUI.get('themeColor')
  }
}

export default connect(mapStateToProps)(PanelHeader)
