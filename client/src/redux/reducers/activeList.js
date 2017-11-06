import Immutable from 'immutable'

import {
  INIT_ACTIVE_LIST,
  ADD_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM,
  CLEAR_UNREAD,
} from '../constants/activeList'

const findItem = (state, payload) => {
  return state.findKey((value) => (
    value.get('nickname') === payload.get('nickname')
    && value.get('type') === payload.get('type')
  ));
}

const  def = Immutable.fromJS([{
  nickname: 'hilda',
  avatar: 'https://cdn.dribbble.com/users/255/screenshots/2848799/avatar-rogemon_1x.png',
  lastWord: '加油',
  lastWordTime: '2017', 
  type: 'private',
  unread: 0
}]);

const activeList = (state = def, action) => {
  switch( action.type ){

    case ADD_ACTIVE_ITEM: {
      return state.push(action.payload);
    }

    case REMOVE_ACTIVE_ITEM: {   
      let index = findItem(state, action.payload);     
      return state.delete(index);
    }

    case UPDATE_ACTIVE_ITEM: {     
      let index = findItem(state, action.payload);
      let unread = state.get(index).get('unread') || 0;
      let newactive = state.get(index).merge(action.payload.set('unread', unread+1));
      return state.set(index, newactive);
    };

    case CLEAR_UNREAD: {
      let index = findItem(state, action.payload);
      let newactive = state.get(index).set('unread', 0);
      return state.set(index, newactive);
    }
    default:
      return state;
  }
}

  export default activeList;