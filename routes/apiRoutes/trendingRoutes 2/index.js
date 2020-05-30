const router = require('express').Router();
const trendingController = require('../../../controllers/trendingController');

// /api/trending
router.route('/employer')
  .get(trendingController.topEmployers);

// /api/trending
router.route('/regional')
  .get(trendingController.regionalData);

// /api/trending
router.route('/historical')
  .get(trendingController.historicalData);

// /api/trending
router.route('/histogram')
  .get(trendingController.histogramData);


module.exports = router;
