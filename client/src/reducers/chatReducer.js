import {
  LOAD_ROOM,
  LOAD_ROOM_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  GET_MESSAGES,
  GET_MESSAGES_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  room: {},
  roomError: '',
  users: [],
  userError: '',
  messages: [],
  messagesError: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ROOM:
      return { ...state, room: action.payload, roomError: '' };
    case LOAD_ROOM_ERROR:
      return { ...state, roomError: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload, userError: '' };
    case GET_USERS_ERROR:
      return { ...state, userError: action.payload };
    case GET_MESSAGES:
      return { ...state, messages: action.payload, messagesError: '' };
    case GET_MESSAGES_ERROR:
      return { ...state, messagesError: action.payload };
    default:
      return state;
  }
}
