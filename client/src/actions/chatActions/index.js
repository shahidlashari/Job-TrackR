import {
  LOAD_ROOM,
  LOAD_ROOM_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  GET_MESSAGES,
  GET_MESSAGES_ERROR,
} from '../types';

export const loadRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ROOM, payload: roomData });
  } catch (e) {
    dispatch({ type: LOAD_ROOM_ERROR, payload: e });
  }
};

export const getUsers = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS, payload: roomData.users });
  } catch (e) {
    dispatch({ type: GET_USERS_ERROR, payload: e });
  }
};

export const createMessage = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: GET_MESSAGES, payload: roomData.messages });
  } catch (e) {
    dispatch({ type: GET_MESSAGES_ERROR, payload: e });
  }
};
