import React from 'react'
import Immutable from 'immutable'
import ActiveListItem from '../../containers/chat/ActiveListItem';
import SearchUser from '../../containers/chat/SearchUser';
import IconMenu from '../common/IconMenu';
import '../../assete/scss/ActiveList.scss';

const ActiveList = ({ activeList, curRoom, selectLeftPanel }) => {
  const lists = activeList.map((item, index) => {
    return (
      <ActiveListItem
        {...item.toJS() }
        isCur = {curRoom === item.get('_id')}
        key={ item.get('_id') }
      />
    )    
  });
  return (
    <div className='active-list'>
      <div className='active-list-wrap'>
        <SearchUser/>
        { lists }
        <span className = 'add'>
          <IconMenu iconClassName = 'icon-menu-add' size = { 50 } >
            <ul className = 'menu-list'>
              <li className = 'list-item' onClick = { () => selectLeftPanel('addGroup') }>加入群组</li>
              <li className = 'list-item' onClick = { () => selectLeftPanel('addPrivate') }>添加私聊</li>
            </ul>
          </IconMenu>  
        </span>
      </div>      
    </div>
  );
}

export default ActiveList;