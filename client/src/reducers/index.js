import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import trendingReducers from './trendingReducers';
import jobsReducer from './jobsReducers';
import chatReducer from './chatReducer';
import { GET_MESSAGES } from '../actions/types';

export default combineReducers({
  auth: authReducer,
  data: trendingReducers,
  jobs: jobsReducer,
  chat: chatReducer,
  form: formReducer.plugin({
    messageInput: (state, action) => {
      switch (action.type) {
        case GET_MESSAGES:
          return undefined;
        default:
          return state;
      }
    },
  }),
});
