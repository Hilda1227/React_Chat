import React from 'react'
import '../../assete/scss/RoomHeader.scss'

const RoomHeader = (props) => {
  const {chatting, activeList, setChatting,closeChatting} = props
  return (
    <div style = {{
          display: chatting.isEmpty()
            ? 'none'
            : 'flex'
      }} className = 'room-header'>
    <div className = 'room-header-wrap'>
      <div id = 'close'
        onClick = {() => {
          console.log(activeList)
          closeChatting({
            nickname: chatting.get('to'),
            type: chatting.get('type')
          });
         console.log(activeList.last().toJS())
          // setChatting( activeList.last())
        } }>
      </div>
      <span>{ chatting.get('to') }</span>
      <div id = 'sendTo'></div>
    </div>
  </div>
  )
}

export default RoomHeader