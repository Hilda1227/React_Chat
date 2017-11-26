import React, {Component} from 'react';
import '../../assete/scss/Layout.scss';

import ActiveList from '../../containers/chat/ActiveList';
import RoomHeader from '../../containers/chat/RoomHeader';
import AsideHeader from '../../containers/chat/AsideHeader';
import Empty from './Empty';
import RoomMsg from '../../containers/chat/RoomMsg';
import RoomFooter from '../../containers/chat/RoomFooter';
import Loading from '../common/Loading';
import LeftPanel from '../../containers/chat/LeftPanel';

const Layout = ({chatting, isLoading}) => {
  return (
    <div className = 'layout'>
      <div className = 'aside'>
        <div className = 'active-panel'>
          <AsideHeader/>
          <ActiveList/>
        </div>
        <LeftPanel/>
      </div>

      {
        chatting.isEmpty() 
        ? <Empty/>
        : (
            <div className = 'room'>
              <RoomHeader/>
              <RoomMsg/>
              <RoomFooter/>
              { isLoading && <Loading/> }
            </div>
          )
      }
    </div> 
  );
}

export default Layout;