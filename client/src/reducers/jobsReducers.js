import {
  SEARCH_JOBS,
  SEARCH_JOBS_ERROR,
  SAVE_USER_JOB,
  SAVE_USER_JOB_ERROR,
  GET_USER_JOBS,
  GET_USER_JOBS_ERROR,
  MOVE_JOBS,
  MOVE_JOBS_ERROR,
  ADD_USER_JOBS,
  ADD_USER_JOBS_ERROR,
  UPDATE_JOBS_BY_ID_ERROR,
  DELETE_JOBS_BY_ID_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  searchJob: [],
  searchJobError: '',
  searchJobResults: [],
  userJobs: [],
  columnsJobs: {
    savedjobs: {
      id: 'savedjobs',
      jobIds: [],
    },
    applying: {
      id: 'applying',
      jobIds: [],
    },
    interviewing: {
      id: 'interviewing',
      jobIds: [],
    },
    offers: {
      id: 'offers',
      jobIds: [],
    },
    rejected: {
      id: 'rejected',
      jobIds: [],
    },
  },
  searchJobServerError: '',
  searchJobClientError: '',
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
    //   return {...state, Jobs: action.payload, getAllJobsError:  '' };
    // case GET_ALL_JOBS_ERROR:
    //   return {...state, getAllJobsError: action.payload };
    case SEARCH_JOBS:
      return { ...state, searchJob: action.payload, searchJobResults: action.payload.data.results, searchJobError: '' };
    case SEARCH_JOBS_ERROR:
      return { ...state, searchJobServerError: action.serverError, searchJobClientError: action.clientError };
    case GET_USER_JOBS:
      return { ...state, userJobs: action.payload, columnsJobs: action.payload, getUserJobsClientError: '', getUserJobsServerError: '', updateJobsCompleteError: '', deleteJobsError: '' };
    case GET_USER_JOBS_ERROR:
      return { ...state, getUserJobsServerError: action.serverError, getUserJobsClientError: action.clientError };
    case MOVE_JOBS:
      const { droppableIdStart, droppableIdEnd, droppableIndexEnd, droppableIndexStart } = action.payload;
      if (droppableIdStart !== droppableIdEnd) {
        const sourceStart = state.columnsJobs[droppableIdStart];
        const jobCard = sourceStart.jobIds.splice(droppableIndexStart, 1);
        const sourceEnd = state.columnsJobs[droppableIdEnd];

        sourceEnd.jobIds.splice(droppableIndexEnd, 0, ...jobCard);
        return { ...state, [droppableIdStart]: sourceStart, [droppableIdEnd]: sourceEnd};
      }
      return state;
    case MOVE_JOBS_ERROR:
      return { ...state, columnsJobs: action.serverError };
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
