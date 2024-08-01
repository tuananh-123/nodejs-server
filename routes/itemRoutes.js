const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { getItems, getById, insertItem, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

router.get('/', authenticateToken, getItems);
router.get('/:id', authenticateToken, getById);
router.post('/insert', authenticateToken, insertItem);
router.put('/update/:id', authenticateToken, updateItem);
router.delete('/delete/:id', authenticateToken, deleteItem);

module.exports = router;