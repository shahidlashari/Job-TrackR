import axios from 'axios';
import {
  GET_USER_JOBS,
  GET_USER_JOBS_ERROR,
  // ADD_USER_JOBS,
  // ADD_USER_JOBS_ERROR,
  UPDATE_JOBS_BY_ID_ERROR,
  DELETE_JOBS_BY_ID_ERROR,
} from '../types';

export const getUserJobs = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/user/jobs', { headers: { 'authorization': localStorage.getItem('token') }});

    dispatch({ type: GET_USER_JOBS, payload: data });
  } catch (e) {
    dispatch({ type: GET_USER_JOBS_ERROR, serverError: e, clientError: 'Something went wrong. Refresh the page and try again' });
  }
};

export const updateJobById= (id, completed, text) => async dispatch => {
  try {
    await axios.put(`/api/user/jobs/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    const { data } = await axios.get('/api/user/jobs', { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({ type: GET_USER_JOBS, payload: data });
  } catch (e) {
    dispatch({ type: UPDATE_JOBS_BY_ID_ERROR, payload: e });
  }
};

export const deleteJobsById= id => async dispatch => {

  try {
    await axios.delete(`/api/user/jobs/${id}`, { headers: { 'authorization': localStorage.getItem('token') }});
    const { data } = await axios.get('/api/user/jobs', { headers: { 'authorization': localStorage.getItem('token') }});
    dispatch({ type: GET_USER_JOBS, payload: data });
  } catch (e) {
    dispatch({ type: DELETE_JOBS_BY_ID_ERROR, payload: e });
  }

};
