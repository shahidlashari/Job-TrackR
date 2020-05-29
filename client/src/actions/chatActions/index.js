import {
  GET_USERS,
  GET_USERS_ERROR,
} from '../types';

export const getUsers = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS, payload: roomData.users });
  } catch (e) {
    dispatch({ type: GET_USERS_ERROR, payload: e });
  }
};
