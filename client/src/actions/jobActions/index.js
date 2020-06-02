import axios from 'axios';
import {
  SEARCH_JOBS,
  SEARCH_JOBS_ERROR,
  GET_USER_JOBS,
  GET_USER_JOBS_ERROR,
  MOVE_JOBS,
  // ADD_USER_JOBS,
  // ADD_USER_JOBS_ERROR,
  UPDATE_JOBS_BY_ID_ERROR,
  UPDATE_JOBS_BY_ID,
  DELETE_JOBS_BY_ID_ERROR,
} from '../types';

export const getUserJobs = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/job/save', { headers: { authorization: localStorage.getItem('token') } });

    dispatch({ type: GET_USER_JOBS, payload: data });
  } catch (e) {
    dispatch({ type: GET_USER_JOBS_ERROR, serverError: e, clientError: 'Something went wrong. Refresh the page and try again' });
  }
};

export const updateJobById = (id, text) => async (dispatch) => {
  try {
    await axios.put(`/api/job/update${id}`, { headers: { authorization: localStorage.getItem('token') } });
    const { data } = await axios.get('/api/user/jobs', { headers: { authorization: localStorage.getItem('token') } });
    dispatch({ type: UPDATE_JOBS_BY_ID, payload: data });
  } catch (e) {
    dispatch({ type: UPDATE_JOBS_BY_ID_ERROR, payload: e });
  }
};

export const sort = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId) => {
  console.log(droppableIdStart);
  return {
    type: MOVE_JOBS,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexEnd,
      droppableIndexStart,
      draggableId,
    }
  }
};

// export const deleteJobsById= id => async dispatch => {

//   try {
//     await axios.delete(`/api/user/jobs/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
//     const { data } = await axios.get('/api/user/jobs', { headers: { 'authorization': localStorage.getItem('token') }});
//     dispatch({ type: GET_USER_JOBS, payload: data });
//   } catch (e) {
//     dispatch({ type: DELETE_JOBS_BY_ID_ERROR, payload: e });
//   }

// };
