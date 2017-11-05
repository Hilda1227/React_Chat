import React from 'react';
import '../../assete/scss/AsideHeader.scss';

const AsideHeader = ({ user }) => (
  <div className = 'aside-header'>
    <img className = 'avatar' src = { user.get('avatar') }/>
    <span className = 'tool'>O</span>
    <span className = 'tool'>O</span>
  </div>
)

export default AsideHeader