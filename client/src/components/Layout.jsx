import React, { Component } from 'react'
import '../assete/scss/Layout.scss'
import { connect } from 'react-redux'
import ActiveList from '../containers/ActiveList'
import RoomHeader from '../containers/RoomHeader'
import AsideHeader from '../containers/AsideHeader'
import Empty from './Empty'
import RoomMsg from '../containers/RoomMsg'
import RoomFooter from '../containers/RoomFooter'
import LeftPanel from '../containers/LeftPanel'
import RightPanel from '../containers/RightPanel'

const Layout = ({ chatting, showRight }) => {
  return (
    <div className={`layout ${chatting ? 'layout-chatting' : ''}`}>
      <div className='aside'>
        <div className='active-panel'>
          <AsideHeader />
          <ActiveList />
        </div>
        <LeftPanel />
      </div>
      {
        chatting
          ? (
            <div className={`room ${showRight ? 'room-showRight' : ''}`}>
              <div className='chat'>
                <RoomHeader />
                <RoomMsg />
                <RoomFooter />
              </div>
              <div className={`right-panel ${showRight ? 'right-panel-show' : ''}`}><RightPanel /></div>
            </div>
            )
          : <Empty />
      }
    </div>
  )
}
export default Layout
