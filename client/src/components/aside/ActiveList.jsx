import React from 'react'
import Immutable from 'immutable'
import ActiveListItem from '../../containers/ActiveListItem';
import '../../assete/scss/ActiveList.scss';

const ActiveList = ({ activeList }) => {
  const lists = activeList.map((item, index) => {
    return (
      <ActiveListItem
      {...item.toJS() }
      key={ item.get('nickname') }
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