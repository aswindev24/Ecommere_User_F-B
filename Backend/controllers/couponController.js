const Coupon = require('../models/Coupon');

// Get all active and valid coupons
exports.getCoupons = async (req, res) => {
    try {
        const currentDate = new Date();

        const coupons = await Coupon.find({
            isActive: true,
            expiryDate: { $gte: currentDate }
        }).select('couponCode description discountPercentage minOrderAmount maxDiscountAmount expiryDate');

        res.json({
            success: true,
            coupons
        });
    } catch (error) {
        console.error('Error fetching coupons:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch coupons'
        });
    }
};

// Apply a coupon
exports.applyCoupon = async (req, res) => {
    try {
        const { couponCode, orderAmount } = req.body;
        const userId = req.user._id;

        if (!couponCode || orderAmount === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code and order amount are required'
            });
        }

        // Find the coupon
        const coupon = await Coupon.findOne({
            couponCode: couponCode.toUpperCase()
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Invalid coupon code'
            });
        }

        // Check if coupon is active
        if (!coupon.isActive) {
            return res.status(400).json({
                success: false,
                message: 'This coupon is no longer active'
            });
        }

        // Check if coupon has expired
        if (new Date() > coupon.expiryDate) {
            return res.status(400).json({
                success: false,
                message: 'This coupon has expired'
            });
        }

        // Check minimum order amount
        if (orderAmount < coupon.minOrderAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum order amount of $${coupon.minOrderAmount} required`
            });
        }

        // Check total usage limit
        if (coupon.totalUsageLimit !== null && coupon.totalUsedCount >= coupon.totalUsageLimit) {
            return res.status(400).json({
                success: false,
                message: 'This coupon has reached its usage limit'
            });
        }

        // Calculate discount
        let discountAmount = (orderAmount * coupon.discountPercentage) / 100;

        // Apply max discount cap if specified
        if (coupon.maxDiscountAmount !== null && discountAmount > coupon.maxDiscountAmount) {
            discountAmount = coupon.maxDiscountAmount;
        }

        // Return coupon details with calculated discount
        res.json({
            success: true,
            coupon: {
                code: coupon.couponCode,
                description: coupon.description,
                discountPercentage: coupon.discountPercentage,
                discountAmount: discountAmount,
                type: 'percentage'
            }
        });

    } catch (error) {
        console.error('Error applying coupon:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to apply coupon'
        });
    }
};
