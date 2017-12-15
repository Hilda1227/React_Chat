import React from 'react';
import '../assete/scss/ImageMessageItem.scss';
import { Component } from 'react';
import { connect } from 'react-redux';


const ImageMessageItem = (props) => {
  return (
    <div className = 'content image-content'>
      <img src = { props.content }/>
    </div>
  )
}
export default ImageMessageItem
