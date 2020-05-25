import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import trendingReducers from './trendingReducers';
import jobsReducer from './jobsReducers';

// import { ADD_USER_TODO } from '../actions/types';

export default combineReducers({
  auth: authReducer,
  data: trendingReducers,
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
