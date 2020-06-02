const axios = require('axios');

const ApiKey = '75e609a27626a56505b2a4146911e052';

const AppId = '97677353';

module.exports = {
  getEmployerData: async (req, res) => {
    const { jobtitle } = req.query;
    try {
      const { data } = await axios.get(`http://api.adzuna.com/v1/api/jobs/us/top_companies?content-type=application/json&app_id=${AppId}&app_key=${ApiKey}&what=${jobtitle}`);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getRegionalData: async (req, res) => {
    const { statenamer } = req.query;
    try {
      const { data } = await axios.get(`http://api.adzuna.com/v1/api/jobs/us/history?app_id=${AppId}&app_key=${ApiKey}&location0=us&location1=${statenamer}&content-type=application/json`);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getHistoricalData: async (req, res) => {
    const { statenameh, jobcategoryh } = req.query;
    try {
      const { data } = await axios.get(`http://api.adzuna.com/v1/api/jobs/us/history?app_id=${AppId}&app_key=${ApiKey}&location0=US&location1=${statenameh}&category=${jobcategoryh}&content-type=application/json`);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getHistogramData: async (req, res) => {
    const { statename, jobtitleh } = req.query;
    try {
      const { data } = await axios.get(`http://api.adzuna.com/v1/api/jobs/us/histogram?app_id=${AppId}&app_key=${ApiKey}&location0=US&location1=${statename}&what=${jobtitleh}&content-type=application/json`);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};
