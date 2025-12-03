import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CouponSection = ({ appliedCoupon, onCouponApplied, onCouponRemoved, orderAmount }) => {
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/coupons', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setAvailableCoupons(response.data.coupons);
            }
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleApplyCoupon = async () => {
        setCouponError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/coupons/apply',
                {
                    couponCode: couponCode,
                    orderAmount: orderAmount
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                onCouponApplied(response.data.coupon);
                setCouponCode('');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to apply coupon';
            setCouponError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCoupon = async (e) => {
        const selectedCode = e.target.value;
        if (selectedCode) {
            setCouponCode(selectedCode);
            setCouponError('');
            setLoading(true);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:5000/api/coupons/apply',
                    {
                        couponCode: selectedCode,
                        orderAmount: orderAmount
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (response.data.success) {
                    onCouponApplied(response.data.coupon);
                    setCouponCode('');
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to apply coupon';
                setCouponError(errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveCoupon = () => {
        onCouponRemoved();
        setCouponCode('');
        setCouponError('');
    };

    return (
        <div className="coupon-section">
            <h4>HAVE A COUPON?</h4>

            {!appliedCoupon ? (
                <>
                    <div className="coupon-input-group">
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => {
                                setCouponCode(e.target.value.toUpperCase());
                                setCouponError('');
                            }}
                            className="coupon-input"
                        />
                        <button
                            onClick={handleApplyCoupon}
                            className="apply-coupon-btn"
                            disabled={!couponCode.trim() || loading}
                        >
                            {loading ? 'APPLYING...' : 'APPLY'}
                        </button>
                    </div>
                    {couponError && <p className="coupon-error">{couponError}</p>}

                    <div className="coupon-divider">
                        <span>OR</span>
                    </div>

                    <div className="coupon-select-group">
                        <label>SELECT FROM AVAILABLE COUPONS</label>
                        <select onChange={handleSelectCoupon} defaultValue="" disabled={loading}>
                            <option value="">Choose a coupon</option>
                            {availableCoupons.map(coupon => (
                                <option key={coupon.couponCode} value={coupon.couponCode}>
                                    {coupon.couponCode} - {coupon.description} ({coupon.discountPercentage}% off)
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            ) : (
                <div className="applied-coupon">
                    <div className="applied-coupon-info">
                        <p><strong>{appliedCoupon.code}</strong> applied</p>
                        <p className="coupon-desc">{appliedCoupon.description}</p>
                        <p className="coupon-discount">Discount: ${appliedCoupon.discountAmount?.toFixed(2)}</p>
                    </div>
                    <button onClick={handleRemoveCoupon} className="remove-coupon-btn">
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default CouponSection;