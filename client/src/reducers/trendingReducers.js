import {
  GET_EMPLOYER_DATA,
  GET_EMPLOYER_DATA_ERROR,
  GET_REGIONAL_DATA,
  GET_REGIONAL_DATA_ERROR,
  GET_HISTORICAL_DATA,
  GET_HISTORICAL_DATA_ERROR,
  GET_HISTOGRAM_DATA,
  GET_HISTOGRAM_DATA_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  employerData: [],
  employerDataLocation: '',
  regionalData: [],
  regionalDataLocation: '',
  historicalData: [],
  historicalDataLocation: '',
  histogramData: [],
  histogramDataLocation: '',
  getEmployerServerError: '',
  getEmployerClientError: '',
  getRegionalServerError: '',
  getRegionalClientError: '',
  getHistoricalServerError: '',
  getHistoricalClientError: '',
  getHistogramServerError: '',
  getHistogramClientError: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_EMPLOYER_DATA:
      return { ...state, employerData: action.payload.leaderboard, employerDataLocation: action.location, getEmployerServerError: '', getEmployerClientError: '' };
    case GET_EMPLOYER_DATA_ERROR:
      return { ...state, getEmployerServerError: action.serverError, getEmployerClientError: action.clientError };
    case GET_REGIONAL_DATA:
      return { ...state, regionalData: action.payload, regionalDataLocation: action.location, getRegionalServerError: '', getRegionalClientError: '' };
    case GET_REGIONAL_DATA_ERROR:
      return { ...state, getRegionalServerError: action.serverError, getRegionalClientError: action.clientError };
    case GET_HISTORICAL_DATA:
      return { ...state, historicalData: action.payload.month, historicalDataLocation: action.location, getHistoricalServerError: '', getHistoricalClientError: '' };
    case GET_HISTORICAL_DATA_ERROR:
      return { ...state, getHistoricalServerError: action.serverError, getHistoricalClientError: action.clientError };
    case GET_HISTOGRAM_DATA:
      return { ...state, histogramData: action.payload, histogramDataLocation: action.location, getHistogramServerError: '', getHistogramClientError: '' };
    case GET_HISTOGRAM_DATA_ERROR:
      return { ...state, getHistogramServerError: action.serverError, getHistogramClientError: action.clientError };
    default:
      return state;
  }
}
