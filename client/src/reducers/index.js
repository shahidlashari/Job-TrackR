import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';

import { ADD_USER_TODO } from '../actions/types';

export default combineReducers({
  auth: authReducer,
  todos: todosReducer,
  counter: counterReducer,
  form: formReducer
});
