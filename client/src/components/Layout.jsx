import React, {Component} from 'react';
import '../assete/scss/Layout.scss'
import AsideHeader from './aside/AsideHeader'
import Search from '../containers/Search'
import ActiveList from '../containers/ActiveList'
import RoomHeader from '../containers/RoomHeader'

import RoomMsg from './Room/RoomMsg'
import RoomFooter from './Room/RoomFooter'

class Layout extends Component { 
  render () {  
    return (
      <div className = 'index'>
          <div className = 'aside'>
            <AsideHeader/>
            <Search/>
            <ActiveList/>
          </div>
          <div className = 'room'>
            <RoomHeader/>
            <RoomMsg/>
            <RoomFooter/>
          </div>
      </div> 
    );
  }
}

export default Layout;