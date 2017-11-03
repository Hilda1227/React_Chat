import { combineReducers } from 'redux';
import activeList from './activeList';
import chatting from './chatting';


const reducers = combineReducers({
  // user,
  activeList,
  // messages,
  chatting,
}) 

export default reducers;