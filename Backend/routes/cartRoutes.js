const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const protect = require('../middleware/auth');

// All cart routes require authentication
router.use(protect);

// @route   GET /api/cart
// @desc    Get user's cart
router.get('/', cartController.getCart);

// @route   POST /api/cart/add
// @desc    Add item to cart
router.post('/add', cartController.addToCart);

// @route   PUT /api/cart/update/:itemId
// @desc    Update cart item quantity
router.put('/update/:itemId', cartController.updateCartItem);

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
router.delete('/clear', cartController.clearCart);

module.exports = router;
