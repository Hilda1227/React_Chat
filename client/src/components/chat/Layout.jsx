import React, {Component} from 'react';
import '../../assete/scss/Layout.scss'
import Search from '../../containers/chat/Search'
import ActiveList from '../../containers/chat/ActiveList'
import RoomHeader from '../../containers/chat/RoomHeader'
import AsideHeader from '../../containers/chat/AsideHeader'

import RoomMsg from '../../containers/chat/RoomMsg'
import RoomFooter from '../../containers/chat/RoomFooter'

const Layout = props => {
  const { chatting } = props;
  return (
    <div className = 'layout'>
      <div className = 'aside'>
   
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