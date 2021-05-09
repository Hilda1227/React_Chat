import React from 'react'
import '../../assete/scss/Loading.scss'

const Loading = ({ top = 1.5 }) => {
  return (
    <div className='loading' style={{ top: top + 'rem' }}>
      <div className='circle' />
    </div>
  )
}

export default Loading
