const router = require('express').Router();
// eslint-disable-next-line import/no-unresolved
const { jobSearch, jobSave, updateSavedJob, getSavedJobs } = require('../../../controllers/jobSearchController');
const { requireAuth } = require('../../../middlewares/authMiddlewares');

// api/job
router.get('/search', jobSearch);


router.route('/save')
  .get(requireAuth, getSavedJobs)
  .post(requireAuth, jobSave);

router.route('/update')
  .put(updateSavedJob);


module.exports = router;
