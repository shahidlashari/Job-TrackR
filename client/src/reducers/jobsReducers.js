import {
  GET_USER_JOBS,
  GET_USER_JOBS_ERROR,
  ADD_USER_JOBS,
  ADD_USER_JOBS_ERROR,
  UPDATE_JOBS_BY_ID_ERROR,
  DELETE_JOBS_BY_ID_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  jobs: [],
  userJobs: [],
  getUserJobsServerError: '',
  getUserJobsClientError: '',
  getAllJobsError: '',
  updateJobsError: '',
  deleteJobsError: '',
  addJobsError: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // case GET_ALL_JOBS:
    //   return {...state, Jobs: action.payload, getAllJobsError: '' };
    // case GET_ALL_JOBS_ERROR:
    //   return {...state, getAllJobsError: action.payload };
    case GET_USER_JOBS:
      return { ...state, userJobs: action.payload, getUserJobsClientError: '', getUserJobsServerError: '', updateJobsCompleteError: '', deleteJobsError: '' };
    case GET_USER_JOBS_ERROR:
      return { ...state, getUserJobsServerError: action.serverError, getUserJobsClientError: action.clientError };
    case UPDATE_JOBS_BY_ID_ERROR:
      return { ...state, updateJobsCompleteError: action.payload };
    case ADD_USER_JOBS:
      return { ...state, addJobsError: '' };
    case ADD_USER_JOBS_ERROR:
      return { ...state, addJobsError: action.payload };
    case DELETE_JOBS_BY_ID_ERROR:
      return { ...state, deleteJobsError: action.payload };
    default:
      return state;
  }
}
