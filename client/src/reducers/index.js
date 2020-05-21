import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';

// import { ADD_USER_TODO } from '../actions/types';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  // .plugin({
  //   addTodo: (state, action) => {
  //     switch (action.type) {
  //       case ADD_USER_TODO:
  //         return undefined;
  //       default:
  //         return state;
  //     }
  //   },
  // }),
});
