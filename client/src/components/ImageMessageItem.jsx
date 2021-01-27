import React, { Component } from 'react'
import '../assete/scss/ImageMessageItem.scss'

import { connect } from 'react-redux'

const ImageMessageItem = (props) => {
  return (
    <div className='content image-content'>
      <img src={props.content} />
    </div>
  )
}
export default ImageMessageItem
