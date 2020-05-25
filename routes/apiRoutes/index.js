const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const trendingRoutes = require('./trendingRoutes');

// /api

// /api/trending
router.use('/trending', trendingRoutes);

// /api/user
router.use('/user', userRoutes);

// /api/auth
router.use('/auth', authRoutes);

module.exports = router;
