const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrdersByShop,
  getOrdersByUser,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/shop/:id', protect, getOrdersByShop);
router.get('/user/:id', protect, getOrdersByUser);
router.patch('/:id/status', protect, updateOrderStatus);

module.exports = router;
