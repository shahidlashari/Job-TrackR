const router = require('express').Router();
const { requireAuth } = require('../../../middlewares/authMiddlewares');
const {
  jobSearch,
  jobSave,
  updateSavedJob,
  getSavedJobs,
  deleteSavedJob,
} = require('../../../controllers/jobSearchController');

// api/job
router.get('/search', jobSearch);

router.route('/save')
  .get(requireAuth, getSavedJobs)
  .post(requireAuth, jobSave);

router.route('/update')
  .put(requireAuth, updateSavedJob);

router.route('/delete')
  .delete(requireAuth, deleteSavedJob);

module.exports = router;
