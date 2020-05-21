const router = require('express').Router();
const { signUp, signIn } = require('../../../controllers/authController');
const { requireSignIn } = require('../../../middlewares/authMiddlewares');

// /api/auth/signup
router.post('/signup', signUp);

// /api/auth/signin
router.post('/signin', requireSignIn, signIn);

module.exports = router;
