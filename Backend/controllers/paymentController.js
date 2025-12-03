const paymentService = require('../services/payment/paymentService');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

/**
 * Create a payment order
 * @route POST /api/payment/create-order
 * @access Private
 */
exports.createPaymentOrder = async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

        // Create payment order using payment service
        const order = await paymentService.createOrder(
            Math.round(amount * 100), // Convert to paise
            currency || 'INR',
            {
                receipt: receipt || `receipt_${Date.now()}`,
                notes: {
                    userId: req.user.id
                }
            }
        );

        res.json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            },
            paymentMode: paymentService.getPaymentMode()
        });
    } catch (error) {
        console.error('Error creating payment order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment order',
            error: error.message
        });
    }
};

/**
 * Verify payment and create order
 * @route POST /api/payment/verify
 * @access Private
 */
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderData
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment details'
            });
        }

        // Verify payment signature
        const isValid = await paymentService.verifyPayment(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Create order with payment details
        const order = new Order({
            orderId,
            user: req.user.id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.price
            })),
            address: orderData.addressId,
            subtotal: orderData.subtotal,
            discount: orderData.discount || 0,
            tax: orderData.tax,
            total: orderData.total,
            couponCode: orderData.couponCode || null,
            paymentId: razorpay_payment_id,
            paymentStatus: 'completed',
            paymentMethod: 'razorpay',
            status: 'pending'
        });

        await order.save();

        // Clear the cart after successful order
        cart.items = [];
        await cart.save();

        // Populate order details for response
        await order.populate('items.product');
        await order.populate('address');

        res.json({
            success: true,
            message: 'Payment verified and order created successfully',
            order: order
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify payment',
            error: error.message
        });
    }
};

/**
 * Get payment mode (for frontend to know if using dummy or production)
 * @route GET /api/payment/mode
 * @access Public
 */
exports.getPaymentMode = async (req, res) => {
    res.json({
        success: true,
        mode: paymentService.getPaymentMode()
    });
};
