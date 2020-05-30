import uuid from 'uuidv4';
import { CONSTANTS } from '../actions/draganddropActions';

const initialState = ['board-0'];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      return [...state, `board-${action.payload.id}`];
    }
    default:
      return state;
  }
};

export default boardOrderReducer;
