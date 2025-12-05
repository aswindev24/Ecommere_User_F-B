import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Fetch orders on mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoadingOrders(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setOrders(response.data.orders);
            }
            setLoadingOrders(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoadingOrders(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(
                    `http://localhost:5000/api/orders/${orderId}/cancel`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data.success) {
                    alert('Order cancelled successfully');
                    fetchOrders();
                }
            } catch (error) {
                console.error('Error cancelling order:', error);
                alert(error.response?.data?.message || 'Failed to cancel order');
            }
        }
    };

    const handleTrackOrder = (orderId) => {
        alert(`Tracking order ${orderId}`);
    };

    return (
        <div className="profileSection">
            <h2>ORDER HISTORY</h2>

            {loadingOrders ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="ordersList">
                    {orders.map(order => {
                        const isDelivered = order.status.toLowerCase() === 'delivered';
                        const isCancelled = order.status.toLowerCase() === 'cancelled';
                        const canCancel = !isDelivered && !isCancelled;
                        const canTrack = !isCancelled;

                        return (
                            <div key={order._id} className="orderCard">
                                <div className="orderHeader">
                                    <div>
                                        <h4>Order ID: {order._id}</h4>
                                        <p className="orderDate">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        {order.address && (
                                            <p className="deliveryDate" style={{ fontSize: '0.9rem', color: '#cc0a0aff', marginTop: '4px' }}>
                                                Expected Delivery: {(() => {
                                                    const orderDate = new Date(order.createdAt);
                                                    const state = order.address.state?.toLowerCase() || '';
                                                    const daysToAdd = state.includes('kerala') || state.includes('kerla') ? 3 : 10;
                                                    const deliveryDate = new Date(orderDate);
                                                    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
                                                    return deliveryDate.toLocaleDateString();
                                                })()}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`orderStatus status-${order.status.toLowerCase()}`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="orderItems">
                                    <h5>ORDER ITEMS:</h5>
                                    <div className="orderItemsList">
                                        {order.items.map(item => (
                                            <div key={item._id} className="orderItem">
                                                <div className="orderItemImage">
                                                    <img
                                                        src={item.product.images && item.product.images.length > 0
                                                            ? `http://localhost:5000${item.product.images[0]}`
                                                            : 'https://via.placeholder.com/100'}
                                                        alt={item.product.name}
                                                    />
                                                </div>
                                                <div className="orderItemDetails">
                                                    <p className="itemName">{item.product.name}</p>
                                                    <p className="itemCategory">{item.product.category?.name}</p>
                                                    <p className="itemPrice">${item.price.toFixed(2)} × {item.quantity}</p>
                                                </div>
                                                <div className="orderItemTotal">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="orderDetails">
                                    <div className="orderDetailRow">
                                        <span>TOTAL ITEMS:</span>
                                        <span>{order.items.reduce((total, item) => total + item.quantity, 0)} items</span>
                                    </div>
                                    <div className="orderDetailRow">
                                        <span>ORDER TOTAL RS:  </span>
                                        <span className="orderTotal"> {order.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="orderActions">
                                    {canCancel && (
                                        <button
                                            onClick={() => handleCancelOrder(order._id)}
                                            className="cancelOrderButton"
                                        >
                                            CANCEL ORDER
                                        </button>
                                    )}

                                    {canTrack && (
                                        <button
                                            onClick={() => handleTrackOrder(order._id)}
                                            className="trackOrderButton"
                                            disabled={isDelivered}
                                        >
                                            {isDelivered ? 'DELIVERED' : 'TRACK ORDER'}
                                        </button>
                                    )}

                                    {isCancelled && (
                                        <button
                                            className="orderCancelledButton"
                                            disabled
                                        >
                                            ORDER CANCELLED
                                        </button>
                                    )}
                                </div>
                                {!isCancelled && (
                                    <div className="orderStatusTimeline">
                                        <h5>ORDER STATUS:</h5>
                                        <div className="timeline">
                                            <div className={`timeline-step ${order.status !== 'cancelled' ? 'completed' : ''}`}>
                                                <div className="timeline-dot"></div>
                                                <span>Order Placed</span>
                                            </div>
                                            <div className={`timeline-step ${['shipped', 'delivered'].includes(order.status) ? 'completed' : ''}`}>
                                                <div className="timeline-dot"></div>
                                                <span>Shipped</span>
                                            </div>
                                            <div className={`timeline-step ${order.status === 'delivered' ? 'completed' : ''}`}>
                                                <div className="timeline-dot"></div>
                                                <span>Delivered</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;