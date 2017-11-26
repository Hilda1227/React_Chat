import React from 'react'
import Immutable from 'immutable'
import ActiveListItem from '../../containers/chat/ActiveListItem';
import SearchUser from '../../containers/chat/SearchUser';
import '../../assete/scss/ActiveList.scss';

const ActiveList = ({ activeList, curRoom }) => {
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
      </div>      
    </div>
  );
}

export default ActiveList;