import React, { Component } from 'react'
import '../assete/scss/FileMessageItem.scss'

import { connect } from 'react-redux'
import { formatDate } from '../util/date.js'

const FileMessageItem = (props) => {
  const { src, fileName, size } = JSON.parse(props.content)
  return (
    <div className='content file-content'>
      <div className='file-wrap'>
        <div className='file-img' />
        <div className='info'>
          <span className='filename'>{fileName}</span>
          <span className='size'>{size}</span>
        </div>
        <a href={src} />
      </div>
    </div>
  )
}
export default FileMessageItem
