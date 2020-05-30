const router = require('express').Router();
const {
  getEmployerData,
  getRegionalData,
  getHistoricalData,
  getHistogramData,
} = require('../../../controllers/trendingController');

// /api/trending
router.route('/employer')
  .get(getEmployerData);

// /api/trending
router.route('/regional')
  .get(getRegionalData);

// /api/trending
router.route('/historical')
  .get(getHistoricalData);

// /api/trending
router.route('/histogram')
  .get(getHistogramData);

module.exports = router;
