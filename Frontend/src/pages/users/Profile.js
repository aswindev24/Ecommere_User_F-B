import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Profile.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: ''
  });

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        gender: user.gender || ''
      });
    }
  }, [user]);

  const [addresses, setAddresses] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    houseName: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phoneNumber: ''
  });

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/addresses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (activeSection === 'orders') {
      fetchOrders();
    }
  }, [activeSection]);

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

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePersonalInfo = async () => {
    const result = await updateProfile(personalInfo);
    if (result.success) {
      setIsEditingPersonal(false);
      alert('Personal information updated successfully!');
    } else {
      alert(result.message || 'Failed to update profile');
    }
  };

  const handleAddressChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAddress = async () => {
    if (!newAddress.houseName || !newAddress.street || !newAddress.city ||
      !newAddress.state || !newAddress.pincode || !newAddress.country ||
      !newAddress.phoneNumber) {
      alert('Please fill all address fields!');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (editingAddressId) {
        // Update existing address
        await axios.put(`http://localhost:5000/api/addresses/${editingAddressId}`, newAddress, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEditingAddressId(null);
      } else {
        // Add new address
        await axios.post('http://localhost:5000/api/addresses', newAddress, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // Refresh addresses list
      await fetchAddresses();

      setNewAddress({
        type: 'Home',
        houseName: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phoneNumber: ''
      });
      setIsAddingAddress(false);
      alert('Address saved successfully!');
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({
      type: address.type,
      houseName: address.houseName,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      phoneNumber: address.phoneNumber
    });
    setEditingAddressId(address._id);
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        await fetchAddresses();
        alert('Address deleted successfully!');
      } catch (error) {
        console.error('Error deleting address:', error);
        alert('Failed to delete address. Please try again.');
      }
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

  const handleSetDefaultAddress = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/addresses/${id}`,
        { isDefault: true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      await fetchAddresses();
      alert('Default address updated!');
    } catch (error) {
      console.error('Error setting default address:', error);
      alert('Failed to set default address. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      <Header />

      <div className="profileContainer">
        <div className="profileMain">
          <div className="profile__left">
            <div className="profileNavigation">
              <h3>MY ACCOUNT</h3>
              <ul>
                <li>
                  <a
                    href="#profile"
                    className={activeSection === 'profile' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection('profile');
                      setIsDrawerOpen(false);
                    }}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#orders"
                    className={activeSection === 'orders' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection('orders');
                      setIsDrawerOpen(false);
                    }}
                  >
                    View Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#password"
                    className={activeSection === 'password' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection('password');
                      setIsDrawerOpen(false);
                    }}
                  >
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="profile__right">
            <div className="profileHeader">
              <div className="profileBreadcrumbLink">
                <a href="/">HOME</a> / <span>MY ACCOUNT</span>
              </div>
              <div className="filterLeft" onClick={() => setIsDrawerOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <p>MENU</p>
              </div>
            </div>

            {activeSection === 'profile' && (
              <div className="profileContent">
                <div className="profileSection">
                  <div className="sectionHeader">
                    <h2>PERSONAL INFORMATION</h2>
                    {!isEditingPersonal && (
                      <button onClick={() => setIsEditingPersonal(true)} className="editButton">
                        EDIT
                      </button>
                    )}
                  </div>

                  {isEditingPersonal ? (
                    <div className="profileForm">
                      <div className="formRow">
                        <div className="formGroup">
                          <label>FIRST NAME</label>
                          <input
                            type="text"
                            value={personalInfo.firstName}
                            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                          />
                        </div>
                        <div className="formGroup">
                          <label>LAST NAME</label>
                          <input
                            type="text"
                            value={personalInfo.lastName}
                            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="formGroup">
                        <label>EMAIL</label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          disabled
                          className="disabled-input"
                        />
                      </div>

                      <div className="formGroup">
                        <label>PHONE NUMBER</label>
                        <input
                          type="tel"
                          value={personalInfo.phoneNumber}
                          onChange={(e) => handlePersonalInfoChange('phoneNumber', e.target.value)}
                        />
                      </div>

                      <div className="formRow">
                        <div className="formGroup">
                          <label>DATE OF BIRTH</label>
                          <input
                            type="date"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                          />
                        </div>
                        <div className="formGroup">
                          <label>GENDER</label>
                          <select
                            value={personalInfo.gender}
                            onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not">Prefer not to say</option>
                          </select>
                        </div>
                      </div>

                      <div className="formActions">
                        <button onClick={handleSavePersonalInfo} className="submitButton">
                          SAVE CHANGES
                        </button>
                        <button onClick={() => setIsEditingPersonal(false)} className="cancelButton">
                          CANCEL
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="profileDisplay">
                      <div className="displayRow">
                        <span className="label">NAME:</span>
                        <span className="value">{personalInfo.firstName} {personalInfo.lastName}</span>
                      </div>
                      <div className="displayRow">
                        <span className="label">EMAIL:</span>
                        <span className="value">{personalInfo.email}</span>
                      </div>
                      <div className="displayRow">
                        <span className="label">PHONE:</span>
                        <span className="value">{personalInfo.phoneNumber}</span>
                      </div>
                      <div className="displayRow">
                        <span className="label">DATE OF BIRTH:</span>
                        <span className="value">{personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString() : ''}</span>
                      </div>
                      <div className="displayRow">
                        <span className="label">GENDER:</span>
                        <span className="value">{personalInfo.gender ? personalInfo.gender.charAt(0).toUpperCase() + personalInfo.gender.slice(1).replace('-', ' ') : ''}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="profileSection">
                  <div className="sectionHeader">
                    <h2>DELIVERY ADDRESSES</h2>
                    {!isAddingAddress && (
                      <button onClick={() => setIsAddingAddress(true)} className="editButton">
                        ADD NEW ADDRESS
                      </button>
                    )}
                  </div>

                  {isAddingAddress ? (
                    <div className="profileForm addressForm">
                      <div className="formGroup">
                        <label>ADDRESS TYPE</label>
                        <select
                          value={newAddress.type}
                          onChange={(e) => handleAddressChange('type', e.target.value)}
                        >
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="formGroup">
                        <label>HOUSE/FLAT NAME</label>
                        <input
                          type="text"
                          value={newAddress.houseName}
                          onChange={(e) => handleAddressChange('houseName', e.target.value)}
                          placeholder="Enter house/flat name or number"
                        />
                      </div>

                      <div className="formGroup">
                        <label>STREET ADDRESS</label>
                        <input
                          type="text"
                          value={newAddress.street}
                          onChange={(e) => handleAddressChange('street', e.target.value)}
                          placeholder="Enter street address"
                        />
                      </div>

                      <div className="formRow">
                        <div className="formGroup">
                          <label>CITY</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div className="formGroup">
                          <label>STATE</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) => handleAddressChange('state', e.target.value)}
                            placeholder="State"
                          />
                        </div>
                      </div>

                      <div className="formRow">
                        <div className="formGroup">
                          <label>PINCODE</label>
                          <input
                            type="text"
                            value={newAddress.pincode}
                            onChange={(e) => handleAddressChange('pincode', e.target.value)}
                            placeholder="Pincode"
                          />
                        </div>
                        <div className="formGroup">
                          <label>COUNTRY</label>
                          <input
                            type="text"
                            value={newAddress.country}
                            onChange={(e) => handleAddressChange('country', e.target.value)}
                            placeholder="Country"
                          />
                        </div>
                      </div>

                      <div className="formGroup">
                        <label>PHONE NUMBER</label>
                        <input
                          type="tel"
                          value={newAddress.phoneNumber}
                          onChange={(e) => handleAddressChange('phoneNumber', e.target.value)}
                          placeholder="Phone number for delivery"
                        />
                      </div>

                      <div className="formActions">
                        <button onClick={handleSaveAddress} className="submitButton">
                          {editingAddressId ? 'UPDATE ADDRESS' : 'SAVE ADDRESS'}
                        </button>
                        <button onClick={() => {
                          setIsAddingAddress(false);
                          setEditingAddressId(null);
                          setNewAddress({
                            type: 'Home',
                            houseName: '',
                            street: '',
                            city: '',
                            state: '',
                            pincode: '',
                            country: '',
                            phoneNumber: ''
                          });
                        }} className="cancelButton">
                          CANCEL
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="addressesList">
                      {addresses.map(address => (
                        <div key={address._id} className="addressCard">
                          <div className="addressHeader">
                            <div className="addressTypeBadge">
                              {address.type.toUpperCase()}
                              {address.isDefault && <span className="defaultBadge">DEFAULT</span>}
                            </div>
                            <div className="addressActions">
                              <button onClick={() => handleEditAddress(address)} className="actionLink">
                                EDIT
                              </button>
                              <button onClick={() => handleDeleteAddress(address._id)} className="actionLink">
                                DELETE
                              </button>
                            </div>
                          </div>
                          <div className="addressDetails">
                            <p>{address.houseName}</p>
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} - {address.pincode}</p>
                            <p>{address.country}</p>
                            <p>Phone: {address.phoneNumber}</p>
                          </div>
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(address._id)}
                              className="setDefaultButton"
                            >
                              SET AS DEFAULT
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'orders' && (
              <div className="profileContent">
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
                                <span>ORDER TOTAL:</span>
                                <span className="orderTotal">${order.total.toFixed(2)}</span>
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
              </div>
            )}

            {activeSection === 'password' && (
              <div className="profileContent">
                <ChangePassword />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`filterDrawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawerHeader">
          <p>MY ACCOUNT</p>
          <div className="closeButton" onClick={() => setIsDrawerOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <div className="drawerContent">
          <ul className="drawerMenu">
            <li>
              <a
                href="#profile"
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('profile');
                  setIsDrawerOpen(false);
                }}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#orders"
                className={activeSection === 'orders' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('orders');
                  setIsDrawerOpen(false);
                }}
              >
                View Orders
              </a>
            </li>
            <li>
              <a
                href="#password"
                className={activeSection === 'password' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('password');
                  setIsDrawerOpen(false);
                }}
              >
                Change Password
              </a>
            </li>
          </ul>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="drawerOverlay"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;