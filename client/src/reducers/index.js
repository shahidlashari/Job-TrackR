import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import trendingReducers from './trendingReducers';
import jobsReducer from './jobsReducers';
import chatReducer from './chatReducer';

import {
  GET_MESSAGES,
  GET_EMPLOYER_DATA,
  GET_REGIONAL_DATA,
  GET_HISTORICAL_DATA,
  GET_HISTOGRAM_DATA,
} from '../actions/types';

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
    SearchEmployerData: (state, action) => {
      switch (action.type) {
        case GET_EMPLOYER_DATA:
          return undefined;
        default:
          return state;
      }
    },
    SearchRegionalData: (state, action) => {
      switch (action.type) {
        case GET_REGIONAL_DATA:
          return undefined;
        default:
          return state;
      }
    },
    SearchHistoricalData: (state, action) => {
      switch (action.type) {
        case GET_HISTORICAL_DATA:
          return undefined;
        default:
          return state;
      }
    },
    SearchHistogramData: (state, action) => {
      switch (action.type) {
        case GET_HISTOGRAM_DATA:
          return undefined;
        default:
          return state;
      }
    },
  }),
});
