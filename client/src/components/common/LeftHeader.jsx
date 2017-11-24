import React, { Component } from 'react';
const LeftHeader = ({title, close}) => {
  return (
    <div className = 'header'>
      <span onClick = { close } className = 'close'></span>
      <span>{ title }</span>
    </div>
  );
}
export default LeftHeader;