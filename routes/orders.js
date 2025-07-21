const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Create a new order
router.post('/', auth, orderController.createOrder);

// Get all orders (with optional filtering)
router.get('/', auth, orderController.getOrders);

// Get a specific order
router.get('/:id', auth, orderController.getOrderById);

// Update order status
router.patch('/:id/status', auth, orderController.updateOrderStatus);

// Delete an order
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router; 