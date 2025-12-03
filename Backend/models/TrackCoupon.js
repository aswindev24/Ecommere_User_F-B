const mongoose = require('mongoose');

const trackCouponSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    usageCount: {
        type: Number,
        default: 1,
        min: 0
    }
}, {
    timestamps: true
});

// Index for faster lookups
trackCouponSchema.index({ userId: 1, couponId: 1 });
trackCouponSchema.index({ orderId: 1 });

module.exports = mongoose.model('TrackCoupon', trackCouponSchema);
