const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Address = require('../models/Address');

// @desc    Create order from cart
// @route   POST /api/orders/create
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { addressId, subtotal, discount, tax, total, couponCode } = req.body;

        if (!addressId) {
            return res.status(400).json({ success: false, message: 'Address is required' });
        }

        const address = await Address.findOne({ _id: addressId, user: req.user._id });
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Create order from cart items
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.price
        }));

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const order = await Order.create({
            orderId,
            user: req.user._id,
            items: orderItems,
            address: addressId,
            subtotal,
            discount: discount || 0,
            tax,
            total,
            couponCode: couponCode || null
        });

        // Clear cart after order creation
        cart.items = [];
        await cart.save();

        await order.populate([
            {
                path: 'items.product',
                populate: { path: 'category subCategory' }
            },
            { path: 'address' }
        ]);

        res.status(201).json({ success: true, order, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get user's order history
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate({
                path: 'items.product',
                populate: { path: 'category subCategory' }
            })
            .populate('address')
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get single order details
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
            .populate({
                path: 'items.product',
                populate: { path: 'category subCategory' }
            })
            .populate('address');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.status === 'delivered') {
            return res.status(400).json({ success: false, message: 'Cannot cancel delivered order' });
        }

        if (order.status === 'cancelled') {
            return res.status(400).json({ success: false, message: 'Order already cancelled' });
        }

        order.status = 'cancelled';
        await order.save();

        await order.populate([
            {
                path: 'items.product',
                populate: { path: 'category subCategory' }
            },
            { path: 'address' }
        ]);

        res.json({ success: true, order, message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
