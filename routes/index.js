const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

// Sets up /api
router.use('/api', apiRoutes);

module.exports = router;
