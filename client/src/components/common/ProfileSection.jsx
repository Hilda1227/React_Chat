import React from 'react'
import '../../assete/scss/ProfileSection.scss';

const ProfileSection = ({ hover, title, children, color = '#37b6df' }) => {
  return (
    <div className = {`profile-section profile-section-${ hover ? 'hover' : '' }`}>
      <div className = 'profile-section-wrap'>
        { title && (<span className = 'profile-title' style = {{ color }}>{ title }</span>) }
        { children && <div className = 'profile-content'style = {{borderColor: color}}>{ children }</div>  }
      </div>     
    </div>
  )
  
}

export default ProfileSection;