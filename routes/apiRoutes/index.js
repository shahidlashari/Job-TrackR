const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

// /api

// /api/user
router.use('/user', userRoutes);

// /api/auth
router.use('/auth', authRoutes);

module.exports = router;
