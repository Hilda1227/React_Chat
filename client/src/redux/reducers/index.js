import { combineReducers } from 'redux';
import activeList from './activeList';
import chatting from './chatting';
import message from './message';
import user from './user';


const reducers = combineReducers({
  user,
  activeList,
  message,
  chatting,
}) 

export default reducers;