const router = require('express').Router();
const trendingController = require('../../../controllers/trendingController');

// /api/trending
router.route('/employer')
  .get(trendingController.getEmployerData);

// /api/trending
router.route('/regional')
  .get(trendingController.getRegionalData);

// /api/trending
router.route('/historical')
  .get(trendingController.getHistoricalData);

// /api/trending
router.route('/histogram')
  .get(trendingController.getHistogramData);


module.exports = router;
