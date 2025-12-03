/**
 * Dummy Razorpay Implementation
 * 
 * This module simulates Razorpay payment gateway for testing purposes.
 * It generates mock order IDs and payment IDs without making actual API calls.
 */

const crypto = require('crypto');

/**
 * Generate a dummy order ID
 */
const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `order_dummy_${timestamp}_${random}`;
};

/**
 * Generate a dummy payment ID
 */
const generatePaymentId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `pay_dummy_${timestamp}_${random}`;
};

/**
 * Generate a dummy signature
 */
const generateSignature = (orderId, paymentId) => {
    const secret = 'dummy_secret_key';
    const message = `${orderId}|${paymentId}`;
    return crypto.createHmac('sha256', secret).update(message).digest('hex');
};

module.exports = {
    /**
     * Create a dummy payment order
     * @param {Number} amount - Amount in paise
     * @param {String} currency - Currency code
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Dummy order object
     */
    createOrder: async (amount, currency = 'INR', options = {}) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const orderId = generateOrderId();

        console.log('[DUMMY PAYMENT] Order created:', {
            orderId,
            amount,
            currency,
            receipt: options.receipt || 'N/A'
        });

        return {
            id: orderId,
            entity: 'order',
            amount: amount,
            amount_paid: 0,
            amount_due: amount,
            currency: currency,
            receipt: options.receipt || null,
            status: 'created',
            attempts: 0,
            notes: options.notes || {},
            created_at: Math.floor(Date.now() / 1000)
        };
    },

    /**
     * Verify dummy payment signature
     * @param {String} orderId - Order ID
     * @param {String} paymentId - Payment ID
     * @param {String} signature - Payment signature
     * @returns {Promise<Boolean>} Always returns true for dummy mode
     */
    verifyPayment: async (orderId, paymentId, signature) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        // In dummy mode, we'll accept any signature
        // In production, this would verify the HMAC signature
        const expectedSignature = generateSignature(orderId, paymentId);

        console.log('[DUMMY PAYMENT] Payment verification:', {
            orderId,
            paymentId,
            signatureProvided: signature ? 'Yes' : 'No',
            verified: true
        });

        // For dummy mode, always return true
        return true;
    },

    /**
     * Generate a dummy payment ID (for testing)
     * This is exposed for the frontend to use in dummy mode
     */
    generatePaymentId: generatePaymentId,

    /**
     * Generate a dummy signature (for testing)
     */
    generateSignature: generateSignature
};
