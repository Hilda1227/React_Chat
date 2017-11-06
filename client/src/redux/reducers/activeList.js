import Immutable from 'immutable'

import {
  INIT_ACTIVE_LIST,
  ADD_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM,
  CLEAR_UNREAD,
  SET_ONLINE,
} from '../constants/activeList'

const findItem = (state, payload) => {
  return state.findKey((value) => (
    value.get('nickname') === payload.get('nickname')
    && value.get('type') === payload.get('type')
  ));
}

const activeList = (state = Immutable.fromJS([]), action) => {
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
      if(typeof index != 'undefined'){      
        let unread = state.get(index).get('unread') || 0;
        let newactive = state.get(index).merge(action.payload.set('unread', unread+1));
        return state.set(index, newactive);
      }
      return state;
    };

    case CLEAR_UNREAD: {
      let index = findItem(state, action.payload);
      let newactive = state.get(index).set('unread', 0);
      return state.set(index, newactive);
    };

    case SET_ONLINE: {
      let index = state.findKey((value) => (
        value.get('_id') === action.payload.get('_id')
      ));
      if(typeof index != 'undefined'){
        let newactive = state.get(index).set('onlineState', action.payload.get('state'));
        return state.set(index, newactive);
      }
      return state;
    }
    default:
      return state;
  }
}

  export default activeList;