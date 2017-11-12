import React from 'react'

import '../../assete/scss/Empty.scss';

const Empty = () => {
  return (
    <div className='empty'>      
      <div className = 'welcome'>
        <div className = 'welcome-img'></div>
        <span className = 'welcome-word'>Hi~, 选择房间开始聊天吧</span>
      </div>
    </div>
  );
}

export default Empty;