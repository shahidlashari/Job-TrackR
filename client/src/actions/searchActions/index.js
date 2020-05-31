import {
  SEARCH_JOBS,
  SEARCH_JOBS_ERROR,
} from '../types';

export const searchJob = () => {
  return {
    type: SEARCH_JOBS,
  };
};
export const searchJobError = () => {
  return {
    type: SEARCH_JOBS_ERROR,
  };
};
