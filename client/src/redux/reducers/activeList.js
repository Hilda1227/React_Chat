import Immutable from 'immutable'

import {
  INIT_ACTIVE_LIST,
  ADD_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
  SET_ITEM_UNREAD,
} from '../constants/activeList'

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
        let index = state.findKey((value) => {
          return  value.get('nickname') === action.payload.get('nickname')
              && value.get('type') === action.payload.get('type');
        });     
        return state.delete(index);
      }
      case SET_ITEM_UNREAD: {     
        let index = state.findKey((value) => {
          return  value.get('nickname') === action.payload.get('nickname')
              && value.get('type') === action.payload.get('type');
        });
        let count = state.get(index).get('unread') || 0;  
        return state.update(index, val => val.set( 'unread', count++ ));
      }
      default:
        return state;
    }
  }

  export default activeList;