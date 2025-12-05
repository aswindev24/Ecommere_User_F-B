import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import RazorpayPayment from '../../components/Payment/RazorpayPayment';
import CouponSection from '../../common/Coupon';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { fetchCartCount } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCart(response.data.cart);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart');
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/addresses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(response.data);
      if (response.data.length > 0) {
        setSelectedAddressId(response.data[0]._id);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCart(response.data.cart);
        fetchCartCount();
        showNotification('Item removed from cart');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      showNotification('Failed to remove item', true);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/cart/update/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCart(response.data.cart);
        fetchCartCount();
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      showNotification('Failed to update quantity', true);
    }
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon || !appliedCoupon.discountAmount) return 0;
    return appliedCoupon.discountAmount;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleCouponApplied = (coupon) => {
    setAppliedCoupon(coupon);
    showNotification('Coupon applied successfully');
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(null);
    showNotification('Coupon removed');
  };

  const handlePlaceOrder = () => {
    if (addresses.length === 0) {
      showNotification('Please add a delivery address first', true);
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      return;
    }
    if (!selectedAddressId) {
      showNotification('Please select a delivery address', true);
      return;
    }
    if (!cart || cart.items.length === 0) {
      showNotification('Your cart is empty', true);
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (order) => {
    setShowPaymentModal(false);
    fetchCartCount();
    showNotification('Payment successful! Order placed.');
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  const handlePaymentFailure = (errorMessage) => {
    setShowPaymentModal(false);
    showNotification(errorMessage || 'Payment failed. Please try again.', true);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
  };

  const showNotification = (message, isError = false) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);

  if (loading) return <div className="cart-page"><Header /><div className="cart-container"><h2>Loading...</h2></div><Footer /></div>;
  if (error) return <div className="cart-page"><Header /><div className="cart-container"><h2>{error}</h2></div><Footer /></div>;

  return (
    <div className="cart-page">
      <Header />

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="cart-container">
        <h2>SHOPPING CART</h2>

        <div className="cart-content">
          <div className="cart-left-section">
            <div className="delivery-section">
              <div className="delivery-header">
                <h4>DELIVERY LOCATION</h4>
                <button
                  onClick={() => navigate('/profile')}
                  className="edit-location-btn"
                >
                  MANAGE ADDRESSES
                </button>
              </div>

              {addresses.length > 0 ? (
                <div className="address-selection">
                  <select
                    value={selectedAddressId}
                    onChange={(e) => setSelectedAddressId(e.target.value)}
                    className="address-select"
                  >
                    {addresses.map(address => (
                      <option key={address._id} value={address._id}>
                        {address.houseName}, {address.street}, {address.city} - {address.pincode}
                      </option>
                    ))}
                  </select>
                  {selectedAddress && (
                    <div className="location-display">
                      <p><strong>House/Flat:</strong> {selectedAddress.houseName}</p>
                      <p><strong>Street:</strong> {selectedAddress.street}</p>
                      <p><strong>City:</strong> {selectedAddress.city}</p>
                      <p><strong>State:</strong> {selectedAddress.state}</p>
                      <p><strong>Pincode:</strong> {selectedAddress.pincode}</p>
                      <p><strong>Phone:</strong> {selectedAddress.phoneNumber}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="location-display">
                  <p className="no-location">No delivery addresses found</p>
                  <button onClick={() => navigate('/profile')} className="add-address-btn">
                    ADD ADDRESS
                  </button>
                </div>
              )}
            </div>

            {!cart || cart.items.length === 0 ? (
              <div className="cart-empty">
                <p>YOUR CART IS EMPTY</p>
                <button onClick={() => navigate('/electronics')}>CONTINUE SHOPPING</button>
              </div>
            ) : (
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map(item => (
                    <tr key={item._id}>
                      <td>
                        <div className="product-info">
                          <div className="product-image">
                            <img
                              src={item.product.images && item.product.images.length > 0
                                ? `http://localhost:5000${item.product.images[0]}`
                                : 'https://via.placeholder.com/100'}
                              alt={item.product.name}
                            />
                          </div>
                          <div className="product-details">
                            <h4>{item.product.name}</h4>
                            <p>{item.product.category?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="price-cell">
                        ${item.price.toFixed(2)}
                      </td>
                      <td>
                        <div className="quantity-control">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="total-cell">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveFromCart(item._id)}
                          className="remove-btn"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {cart && cart.items.length > 0 && (
            <div className="order-summary">
              <h3>ORDER SUMMARY</h3>

              <CouponSection
                appliedCoupon={appliedCoupon}
                onCouponApplied={handleCouponApplied}
                onCouponRemoved={handleCouponRemoved}
                orderAmount={calculateSubtotal()}
              />

              <table className="summary-table">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>RS: {calculateSubtotal().toFixed(2)}</td>
                  </tr>
                  {appliedCoupon && (
                    <tr className="discount-row">
                      <th>DISCOUNT</th>
                      <td>RS: {calculateDiscount().toFixed(2)}</td>
                    </tr>
                  )}
                  <tr>
                    <th>TOTAL</th>
                    <td>RS: {calculateTotal().toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={handlePlaceOrder}
                disabled={false}
                className="place-order-btn"
              >
                PLACE ORDER
              </button>
            </div>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <RazorpayPayment
          amount={calculateTotal()}
          orderData={{
            addressId: selectedAddressId,
            subtotal: calculateSubtotal(),
            discount: calculateDiscount(),
            tax: 0,
            total: calculateTotal(),
            couponCode: appliedCoupon ? appliedCoupon.code : null
          }}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
          onClose={handlePaymentClose}
        />
      )}

      <Footer />
    </div>
  );
};

export default Cart;