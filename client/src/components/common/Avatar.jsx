import React from 'react'
import '../../assete/scss/Avatar.scss';

const Avatar = ({ src, size = 12, children }) => {
  let style = {
    backgroundImage: `url(${src})`, 
    width: size + 'rem',
    height: size + 'rem'
  }
  return (
    <div style = { style } className='avatar'>
      { children ? children : null }
    </div>
  )
  
}

export default Avatar;