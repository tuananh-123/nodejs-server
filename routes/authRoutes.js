const express = require('express');
const { login, verifyEmail, signUp, updateUser } = require('../controllers/authController');
const responseMiddleware = require('../middlewares/response.middleware');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/verify', verifyEmail);
router.post('/login', login);
router.post('/signIn', signUp, responseMiddleware);
router.patch('/update/:id', updateUser);

module.exports = router;
