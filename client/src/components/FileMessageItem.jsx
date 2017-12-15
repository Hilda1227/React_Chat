import React from 'react';
import '../assete/scss/FileMessageItem.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../util/date.js'


const FileMessageItem = (props) => {
  let { src, fileName, size } = JSON.parse(props.content)
  return (
    <div className = 'content file-content'>
      <div className = 'file-wrap'>
        <div className = 'file-img'></div>
        <div className = 'info'>
          <span className = 'filename'>{ fileName }</span>
          <span className = 'size'>{ size }</span>
        </div>
        <a href = { src }></a>
      </div>
    </div>
  )
}
export default FileMessageItem
