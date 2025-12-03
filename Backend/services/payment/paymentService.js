/**
 * Payment Service Factory
 * 
 * This module provides a unified interface for payment processing.
 * It can switch between dummy and production implementations based on environment configuration.
 * 
 * Usage:
 *   const paymentService = require('./services/payment/paymentService');
 *   const order = await paymentService.createOrder(amount, currency);
 */

const razorpayDummy = require('./razorpayDummy');
// Uncomment when ready for production
// const razorpayProduction = require('./razorpayProduction');

// Determine which payment implementation to use
const PAYMENT_MODE = process.env.PAYMENT_MODE || 'dummy';

let paymentImplementation;

if (PAYMENT_MODE === 'production') {
    // paymentImplementation = razorpayProduction;
    console.warn('Production payment mode not yet implemented. Falling back to dummy mode.');
    paymentImplementation = razorpayDummy;
} else {
    paymentImplementation = razorpayDummy;
    console.log('Using dummy payment mode for testing');
}

module.exports = {
    /**
     * Create a payment order
     * @param {Number} amount - Amount in smallest currency unit (e.g., paise for INR)
     * @param {String} currency - Currency code (e.g., 'INR')
     * @param {Object} options - Additional options (receipt, notes, etc.)
     * @returns {Promise<Object>} Order object with id, amount, currency
     */
    createOrder: async (amount, currency = 'INR', options = {}) => {
        return await paymentImplementation.createOrder(amount, currency, options);
    },

    /**
     * Verify payment signature
     * @param {String} orderId - Razorpay order ID
     * @param {String} paymentId - Razorpay payment ID
     * @param {String} signature - Payment signature
     * @returns {Promise<Boolean>} True if verification successful
     */
    verifyPayment: async (orderId, paymentId, signature) => {
        return await paymentImplementation.verifyPayment(orderId, paymentId, signature);
    },

    /**
     * Get payment mode (dummy or production)
     * @returns {String} Current payment mode
     */
    getPaymentMode: () => {
        return PAYMENT_MODE;
    }
};
