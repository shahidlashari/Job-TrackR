import { GET_USERS, GET_USERS_ERROR } from '../actions/types';

const INITIAL_STATE = {
  users: [],
  userError: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload, userError: '' };
    case GET_USERS_ERROR:
      return { ...state, userError: action.payload };
    default:
      return state;
  }
}
