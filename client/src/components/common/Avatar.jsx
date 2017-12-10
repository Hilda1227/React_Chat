import React from 'react'
import '../../assete/scss/Avatar.scss';

const Avatar = ({ src, size = '12rem', children }) => {
  let style = {
    backgroundImage: `url(${src})`, 
    width: size,
    height: size
  }
  return (
    <div style = { style } className='avatar'>
      { children ? children : null }
    </div>
  )
  
}

export default Avatar;