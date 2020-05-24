import {
  // eslint-disable-next-line import/named
  GET_EMPLOYER_DATA,
  // eslint-disable-next-line import/named
  GET_EMPLOYER_DATA_ERROR,
  // eslint-disable-next-line import/named
  GET_REGIONAL_DATA,
  // eslint-disable-next-line import/named
  GET_REGIONAL_DATA_ERROR,
  // eslint-disable-next-line import/named
  GET_HISTORICAL_DATA,
  // eslint-disable-next-line import/named
  GET_HISTORICAL_DATA_ERROR,
  // eslint-disable-next-line import/named
  GET_HISTOGRAM_DATA,
  // eslint-disable-next-line import/named
  GET_HISTOGRAM_DATA_ERROR,
} from '../actions/trendingActions';

const INITIAL_STATE = {
  employerData: [],
  regionalData: [],
  historicalData: [],
  histogramData: [],
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
      return { ...state, employerData: action.payload, getEmployerServerError: '', getEmployerClientError: '' };
    case GET_EMPLOYER_DATA_ERROR:
      return { ...state, getEmployerServerError: action.serverError, getEmployerClientError: action.clientError };
    case GET_REGIONAL_DATA:
      return { ...state, regionalData: action.payload, getRegionalServerError: '', getRegionalClientError: '' };
    case GET_REGIONAL_DATA_ERROR:
      return { ...state, getRegionalServerError: action.serverError, getRegionalClientError: action.clientError };
    case GET_HISTORICAL_DATA:
      return { ...state, historicalData: action.payload, getHistoricalServerError: '', getHistoricalClientError: '' };
    case GET_HISTORICAL_DATA_ERROR:
      return { ...state, getHistoricalServerError: action.serverError, getHistoricalClientError: action.clientError };
    case GET_HISTOGRAM_DATA:
      return { ...state, histogramData: action.payload, getHistogramServerError: '', getHistogramClientError: '' };
    case GET_HISTOGRAM_DATA_ERROR:
      return { ...state, getHistogramServerError: action.serverError, getHistogramClientError: action.clientError };
    default:
      return state;
  }
}
