const router = require('express').Router();
const { requireSignIn } = require('../../../middlewares/authMiddlewares');
const { signUp, signIn } = require('../../../controllers/authController');

// /api/auth/signup
router.post('/signup', signUp);

// /api/auth/signin
router.post('/signin', requireSignIn, signIn);

module.exports = router;
