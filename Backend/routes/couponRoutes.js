const express = require('express');
const router = express.Router();
const { getCoupons, applyCoupon } = require('../controllers/couponController');
const protect = require('../middleware/auth');

// Get all active coupons
router.get('/', protect, getCoupons);

// Apply a coupon
router.post('/apply', protect, applyCoupon);

module.exports = router;
