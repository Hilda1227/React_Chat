import Immutable from 'immutable'

import {
  INIT_ACTIVE_LIST,
  ADD_ACTIVE_ITEM,
  REMOVE_ACTIVE_ITEM,
} from '../constants/activeList'

const  def = Immutable.fromJS([{
  nickname: 'hilda',
  avatar: 'https://cdn.dribbble.com/users/255/screenshots/2848799/avatar-rogemon_1x.png',
  lastWord: '加油',
  lastWordTime: '2017', 
  type: 'private'
}]);

const activeList = (state = def, action) => {
    switch( action.type ){
      case ADD_ACTIVE_ITEM:
        return state.push(action.payload);

      case REMOVE_ACTIVE_ITEM:   
      console.log(action.payload.toJS())   
        let index = state.findKey((value) => {
          return  value.get('nickname') === action.payload.get('nickname');
        });     
        return state.delete(index);

      default:
        return state;
    }
  }

  export default activeList;