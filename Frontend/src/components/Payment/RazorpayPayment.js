import React, { useState } from 'react';
import './RazorpayPayment.css';
import axios from 'axios';

const RazorpayPayment = ({ amount, orderData, onSuccess, onFailure, onClose }) => {
    const [processing, setProcessing] = useState(false);
    const [paymentMode, setPaymentMode] = useState('dummy');

    const handlePayment = async (simulateSuccess = true) => {
        try {
            setProcessing(true);

            // Step 1: Create payment order
            const token = localStorage.getItem('token');
            const orderResponse = await axios.post(
                'http://localhost:5000/api/payment/create-order',
                {
                    amount: amount,
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (!orderResponse.data.success) {
                throw new Error('Failed to create payment order');
            }

            const { order, paymentMode: mode } = orderResponse.data;
            setPaymentMode(mode);

            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (!simulateSuccess) {
                throw new Error('Payment failed (simulated)');
            }

            // Step 2: Generate dummy payment ID and signature
            const razorpay_payment_id = `pay_dummy_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
            const razorpay_signature = `sig_dummy_${Date.now()}`;

            // Step 3: Verify payment and create order
            const verifyResponse = await axios.post(
                'http://localhost:5000/api/payment/verify',
                {
                    razorpay_order_id: order.id,
                    razorpay_payment_id: razorpay_payment_id,
                    razorpay_signature: razorpay_signature,
                    orderData: orderData
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (verifyResponse.data.success) {
                onSuccess(verifyResponse.data.order);
            } else {
                throw new Error('Payment verification failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            onFailure(error.response?.data?.message || error.message || 'Payment failed');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="razorpay-overlay">
            <div className="razorpay-modal">
                <div className="razorpay-header">
                    <h2>Complete Payment</h2>
                    <button className="close-btn" onClick={onClose} disabled={processing}>
                        ×
                    </button>
                </div>

                <div className="razorpay-content">
                    {paymentMode === 'dummy' && (
                        <div className="dummy-mode-badge">
                            <span>🧪 TESTING MODE</span>
                            <p>This is a dummy payment gateway for testing</p>
                        </div>
                    )}

                    <div className="payment-details">
                        <div className="detail-row">
                            <span>Amount to Pay:</span>
                            <span className="amount">₹{amount.toFixed(2)}</span>
                        </div>
                        <div className="detail-row">
                            <span>Payment Method:</span>
                            <span>Razorpay {paymentMode === 'dummy' ? '(Dummy)' : ''}</span>
                        </div>
                    </div>

                    <div className="payment-actions">
                        <button
                            className="pay-btn success"
                            onClick={() => handlePayment(true)}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner"></span>
                                    Processing...
                                </>
                            ) : (
                                '✓ Simulate Successful Payment'
                            )}
                        </button>

                        <button
                            className="pay-btn failure"
                            onClick={() => handlePayment(false)}
                            disabled={processing}
                        >
                            ✗ Simulate Failed Payment
                        </button>
                    </div>

                    <div className="payment-info">
                        <p>
                            <strong>Note:</strong> In testing mode, you can simulate both successful and failed payments.
                            In production, this will integrate with real Razorpay checkout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RazorpayPayment;
