import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleLeftPanel } from '../../redux/actions/pageUI';

const LeftHeader = ({title, close}) => {
  return (
    <div className = 'header'>
      <span onClick = { close } className = 'close'></span>
      <span>{ title }</span>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(toggleLeftPanel())
  };
}

export default connect(() => ({}), mapDispatchToProps)(LeftHeader);