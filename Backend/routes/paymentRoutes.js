const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

// @route   POST /api/payment/create-order
// @desc    Create a Razorpay payment order
// @access  Private
router.post('/create-order', auth, paymentController.createPaymentOrder);

// @route   POST /api/payment/verify
// @desc    Verify payment and create order in database
// @access  Private
router.post('/verify', auth, paymentController.verifyPayment);

// @route   GET /api/payment/mode
// @desc    Get current payment mode (dummy or production)
// @access  Public
router.get('/mode', paymentController.getPaymentMode);

module.exports = router;
