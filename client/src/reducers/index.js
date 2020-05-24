import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import dataReducer from './dataReducers';
import jobsReducer from './jobsReducers';

// import { ADD_USER_TODO } from '../actions/types';

export default combineReducers({
  auth: authReducer,
  data: dataReducer,
  jobs: jobsReducer,
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
