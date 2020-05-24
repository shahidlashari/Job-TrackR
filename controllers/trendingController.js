
// eslint-disable-next-line import/no-unresolved
const axios = require('axios');
// eslint-disable-next-line no-undef
// const country = 'us';
// eslint-disable-next-line no-undef
// const position = 'project manager';
module.exports = {

  getEmployerData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/us/top_companies?content-type=application/json&app_id=97677353&app_key=75e609a27626a56505b2a4146911e052&what=cook');
      // console.log(data);

      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getRegionalData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/gb/history?app_id=97677353&app_key=75e609a27626a56505b2a4146911e052&location0=UK&location1=West%20Midlands&content-type=application/json');
      console.log(data);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getHistoricalData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/gb/history?app_id=97677353&app_key=75e609a27626a56505b2a4146911e052&location0=UK&location1=London&category=it-jobs&content-type=application/json');
      console.log(data);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getHistogramData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/gb/histogram?app_id=97677353&app_key=75e609a27626a56505b2a4146911e052 &location0=UK&location1=London&what=finance%20officer&content-type=application/json');
      console.log(data);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

};
