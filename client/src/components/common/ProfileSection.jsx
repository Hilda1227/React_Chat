import React from 'react'
import '../../assete/scss/ProfileSection.scss';
import { connect } from 'react-redux';

const ProfileSection = ({ hover, title, children, themeColor }) => {
  return (
    <div className = {`profile-section profile-section-${ hover ? 'hover' : '' }`}>
      <div className = 'profile-section-wrap'>
        { title && (<span className = 'profile-title' style = {{ color: themeColor}}>{ title }</span>) }
        { children && <div className = 'profile-content'style = {{borderColor:  themeColor}}>{ children }</div>  }
      </div>     
    </div>
  )
  
}

function mapStateToProps(state) {
  return {
    themeColor: state.pageUI.get('themeColor')
  };
}

export default connect(mapStateToProps)(ProfileSection);