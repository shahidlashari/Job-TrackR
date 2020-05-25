const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const jobsRoutes = require('./jobsRoutes');


// /api/user
router.use('/user', userRoutes);

router.use('/auth', authRoutes);

router.use('/job', jobsRoutes);


module.exports = router;
