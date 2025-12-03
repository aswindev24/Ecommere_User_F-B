const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const protect = require('../middleware/auth');

// All order routes require authentication
router.use(protect);

// @route   POST /api/orders/create
// @desc    Create order from cart
router.post('/create', orderController.createOrder);

// @route   GET /api/orders
// @desc    Get user's order history
router.get('/', orderController.getOrders);

// @route   GET /api/orders/:id
// @desc    Get single order details
router.get('/:id', orderController.getOrderById);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
router.put('/:id/cancel', orderController.cancelOrder);

module.exports = router;
