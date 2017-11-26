import React from 'react'
import '../../assete/scss/ProfileSection.scss';

const ProfileSection = ({ title, children, color = '#7a99f2' }) => {
  return (
    <div className = 'profile-section'>
      <div className = 'profile-section-wrap'>
        { title && (<span className = 'profile-title' style = {{ color }}>{ title }</span>) }
        { children && <div className = 'profile-content'style = {{borderColor: color}}>{ children }</div>  }
      </div>     
    </div>
  )
  
}

export default ProfileSection;