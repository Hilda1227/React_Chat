import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleLeftPanel } from '../../redux/actions/pageUI';
import '../../assete/scss/PanelHeader.scss'

const PanelHeader = ({ direction = 'left', title, close, color = '#abcbf6' }) => { 
  return (
    <div className = 'panel-header' style = {{ backgroundColor: color, }} >
      <span onClick = { close } className = {`close-${direction}`}></span>
      <span>{ title }</span>
    </div>
  );
}

export default PanelHeader;