import { combineReducers } from 'redux';
import todoItems from './todos';

export default combineReducers({ todos: todoItems });
