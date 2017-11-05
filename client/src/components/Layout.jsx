import React, {Component} from 'react';
import '../assete/scss/Layout.scss'
import AsideHeader from '../containers/AsideHeader'
import Search from '../containers/Search'
import ActiveList from '../containers/ActiveList'
import RoomHeader from '../containers/RoomHeader'

import RoomMsg from '../containers/RoomMsg'
import RoomFooter from '../containers/RoomFooter'

const Layout = props => {
  const { chatting } = props;
  return (
    <div className = 'index'>
      <div className = 'aside'>
        <AsideHeader/>
        <Search/>
        <ActiveList/>
      </div>
      <div className = { `room${ chatting.isEmpty() ? '-hidden' : '' }` }>
        <RoomHeader/>
        <RoomMsg/>
        <RoomFooter/>
      </div>
    </div> 
  );
}

export default Layout;