const express = require('express');
const { getUser, getUserById } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUser);
router.get('/:id', getUserById);

module.exports = router;