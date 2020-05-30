import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import trendingReducers from './trendingReducers';
import jobsReducer from './jobsReducers';
import chatReducer from './chatReducer';
import activeBoardReducer from './activeBoardReducer';
import listsReducer from './listsReducer';
import cardsReducer from './cardsReducer';
import boardsReducer from './boardsReducer';
import boardOrderReducer from './boardOrderReducer';

// import { ADD_USER_TODO } from '../actions/types';

export default combineReducers({
  auth: authReducer,
  data: trendingReducers,
  jobs: jobsReducer,
  chat: chatReducer,
  form: formReducer,
  lists: listsReducer,
  cards: cardsReducer,
  boards: boardsReducer,
  boardOrder: boardOrderReducer,
  activeBoard: activeBoardReducer,
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
