import axios from 'axios';

import {
  GET_EMPLOYER_DATA,
  GET_EMPLOYER_DATA_ERROR,
  GET_REGIONAL_DATA,
  GET_REGIONAL_DATA_ERROR,
  GET_HISTORICAL_DATA,
  GET_HISTORICAL_DATA_ERROR,
  GET_HISTOGRAM_DATA,
  GET_HISTOGRAM_DATA_ERROR,
} from '../types';


export const getEmployerData = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/trending/employer');

    dispatch({ type: GET_EMPLOYER_DATA, payload: data });
  } catch (e) {
    dispatch({ type: GET_EMPLOYER_DATA_ERROR, serverError: e, clientError: 'Something went wrong. Refresh the page and try again' });
  }
};
export const getRegionalData = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/trending/regional');

    dispatch({ type: GET_REGIONAL_DATA, payload: data });
  } catch (e) {
    dispatch({ type: GET_REGIONAL_DATA_ERROR, serverError: e, clientError: 'Something went wrong. Refresh the page and try again' });
  }
};
export const getHistoricalData = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/trending/historical');

    dispatch({ type: GET_HISTORICAL_DATA, payload: data });
  } catch (e) {
    dispatch({ type: GET_HISTORICAL_DATA_ERROR, serverError: e, clientError: 'Something went wrong. Refresh the page and try again' });
  }
};
export const getHistogramData = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/trending/histogram');

    dispatch({ type: GET_HISTOGRAM_DATA, payload: data });
  } catch (e) {
    dispatch({ type: GET_HISTOGRAM_DATA_ERROR, serverError: e, clientError: 'Something went wrong. Refresh the page and try again' });
  }
};
