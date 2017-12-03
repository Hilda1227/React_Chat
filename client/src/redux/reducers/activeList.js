import Immutable from 'immutable'

import {
  INIT_GROUP_LIST,
  ADD_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  UPDATE_ACTIVE_ITEM,
  SET_ACTIVE_ITEM,
  CLEAR_UNREAD,
  SET_ONLINE,
} from '../constants/activeList'

const findItem = (state, id) => {
  return state.findKey((value) => (
    value.get('_id') === id
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
      let index = findItem(state, action.payload.get('_id'));  
      if(typeof index !== 'undefined'){  
        if(!action.payload.get('curRoom')){
          let unread = state.get(index).get('unread') || 0;
          let newactive = state.get(index).merge(action.payload.set('unread', unread+1));
          return state.set(index, newactive);
        }   
        return state.set(index, state.get(index).merge(action.payload));
      }
      return state;
    };

    case SET_ACTIVE_ITEM: {      
      let index = findItem(state, action.payload.get('_id'));  
      if(typeof index !== 'undefined'){          
        return state.set(index, state.get(index).merge(action.payload));
      }
      return state;
    };

    case CLEAR_UNREAD: {
      let index = findItem(state, action.payload.get('_id')); 
      let newactive = state.get(index).set('unread', 0);
      return state.set(index, newactive);
    };

    case SET_ONLINE: {
      let index = findItem(state, action.payload.get('_id'));
      if(typeof index != 'undefined'){
        let newactive = state.get(index).set('onlineState', action.payload.get('state'));
        return state.set(index, newactive);
      }
      return state;
    };

    case INIT_GROUP_LIST: {
      return action.payload;
    };
    default: {
      return state;
    }
  }
}

  export default activeList;