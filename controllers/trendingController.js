const axios = require('axios');

module.exports = {

  getEmployerData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/us/top_companies?content-type=application/json&app_id=97677353&app_key=75e609a27626a56505b2a4146911e052&what=cook');
      // console.log(data);

      const ComapnyName = (data.leaderboard[0].canonical_name);
      console.log(ComapnyName);
      const Count = (data.leaderboard[0].count);
      console.log(Count);
      return res.status(200).json({ ComapnyName, Count });
      // return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getRegionalData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/gb/history?app_id=97677353&app_key=75e609a27626a56505b2a4146911e052&location0=UK&location1=West%20Midlands&content-type=application/json');
      console.log(data);
      const Location = (data.location.display_name);
      console.log(Location);
      const Month = (data.month);
      console.log(Month);
      return res.status(200).json({ Location, Month });
      // return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getHistoricalData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/gb/history?app_id=97677353&app_key=75e609a27626a56505b2a4146911e052&location0=UK&location1=London&category=it-jobs&content-type=application/json');
      console.log(data);
      const histLocation = (data.location.display_name);
      console.log(histLocation);
      const Month = (data.month);
      console.log(Month);
      return res.status(200).json({ histLocation, Month });
      // return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getHistogramData: async (req, res) => {
    try {
      const { data } = await axios.get('http://api.adzuna.com/v1/api/jobs/gb/histogram?app_id=97677353&app_key=75e609a27626a56505b2a4146911e052 &location0=UK&location1=London&what=finance%20officer&content-type=application/json');
      console.log(data);
      const histoLocation = (data.location.display_name);
      console.log(histoLocation);
      const Histogram = (data.histogram);
      console.log(Histogram);
      return res.status(200).json({ histoLocation, Histogram });
      // return res.status(200).json(data);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },

};
