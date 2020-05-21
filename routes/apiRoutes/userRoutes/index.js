const router = require('express').Router();
const {
  getAllUserEmails,
} = require('../../../controllers/userController');

// const { requireAuth } = require('../../../middlewares/authMiddlewares');

// /api/user

// /api/user/emails
router.get('/emails', getAllUserEmails);

module.exports = router;
