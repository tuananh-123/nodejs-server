const express = require('express');
const { login, verifyEmail, signUp, updateUser, test } = require('../controllers/authController');
const responseMiddleware = require('../middlewares/response.middleware');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/verify', verifyEmail);
router.post('/login', login);
router.post('/signIn', signUp, responseMiddleware);
router.patch('/update/:id', updateUser);
router.get('/test', test);

module.exports = router;
