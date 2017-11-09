import React from 'react'
import Immutable from 'immutable'
import ActiveListItem from '../../containers/chat/ActiveListItem';
import '../../assete/scss/ActiveList.scss';

const ActiveList = ({ activeList }) => {
  const lists = activeList.map((item, index) => {
    return (
      <ActiveListItem
      {...item.toJS() }
      key={ item.get('_id') }
      />
    )    
  });
  return (
    <div className='active-list'>
      { lists }
    </div>
  );
}

export default ActiveList;