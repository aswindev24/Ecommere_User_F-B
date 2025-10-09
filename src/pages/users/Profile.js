import React, { useState } from 'react';
import './Profile.css';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    gender: 'male'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      isDefault: true,
      houseName: 'Apartment 42B',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      country: 'United States',
      phoneNumber: '+1 (555) 123-4567'
    },
    {
      id: 2,
      type: 'work',
      isDefault: false,
      houseName: 'Office Building 5',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      pincode: '10002',
      country: 'United States',
      phoneNumber: '+1 (555) 987-6543'
    }
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [newAddress, setNewAddress] = useState({
    type: 'home',
    houseName: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phoneNumber: ''
  });

  const [orderHistory] = useState([
  {
    id: 'ORD-2024-004',
    date: '2024-12-15',
    total: 189.99,
    status: 'Processing', // New order that can be cancelled
    items: [
      {
        id: 4,
        name: 'Smart Watch',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        category: 'Electronics'
      },
      {
        id: 5,
        name: 'Phone Case',
        price: 19.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop',
        category: 'Accessories'
      }
    ]
  },
  {
    id: 'ORD-2024-001',
    date: '2024-10-01',
    total: 299.99,
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        category: 'Electronics'
      },
      {
        id: 2,
        name: 'Cotton T-Shirt',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        category: 'Clothing'
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-09-15',
    total: 149.50,
    status: 'Delivered',
    items: [
      {
        id: 3,
        name: 'Sports Running Shoes',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        category: 'Footwear'
      },
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        category: 'Electronics'
      }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-09-01',
    total: 89.99,
    status: 'Cancelled',
    items: [
      {
        id: 2,
        name: 'Cotton T-Shirt',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        category: 'Clothing'
      }
    ]
  }
]);

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePersonalInfo = () => {
    setIsEditingPersonal(false);
    alert('Personal information updated successfully!');
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password updated successfully!');
  };

  const handleAddressChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAddress = () => {
    if (!newAddress.houseName || !newAddress.street || !newAddress.city || 
        !newAddress.state || !newAddress.pincode || !newAddress.country || 
        !newAddress.phoneNumber) {
      alert('Please fill all address fields!');
      return;
    }

    if (editingAddressId) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddressId ? { ...newAddress, id: editingAddressId, isDefault: addr.isDefault } : addr
      ));
      setEditingAddressId(null);
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now(), isDefault: false }]);
    }

    setNewAddress({
      type: 'home',
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
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleCancelOrder = (orderId) => {
  if (window.confirm('Are you sure you want to cancel this order?')) {
    // Here you would typically make an API call to cancel the order
    alert(`Order ${orderId} has been cancelled.`);
    // Update the order status in your state
  }
};

const handleTrackOrder = (orderId) => {
  // Here you would typically navigate to a tracking page or show tracking details
  alert(`Tracking order ${orderId}`);
};

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <div className="profileContainer">
        <div className="profileMain">
          {/* Left Sidebar Navigation */}
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
                <li>
                  <a 
                    href="#logout" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Content Section */}
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

            {/* Profile Section */}
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
                          onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
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
                        <span className="value">{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div className="displayRow">
                        <span className="label">GENDER:</span>
                        <span className="value">{personalInfo.gender.charAt(0).toUpperCase() + personalInfo.gender.slice(1).replace('-', ' ')}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Addresses */}
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
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
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
                            type: 'home',
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
                        <div key={address.id} className="addressCard">
                          <div className="addressHeader">
                            <div className="addressTypeBadge">
                              {address.type.toUpperCase()}
                              {address.isDefault && <span className="defaultBadge">DEFAULT</span>}
                            </div>
                            <div className="addressActions">
                              <button onClick={() => handleEditAddress(address)} className="actionLink">
                                EDIT
                              </button>
                              <button onClick={() => handleDeleteAddress(address.id)} className="actionLink">
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
                              onClick={() => handleSetDefaultAddress(address.id)} 
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

            {/* Orders Section */}
{activeSection === 'orders' && (
  <div className="profileContent">
    <div className="profileSection">
      <h2>ORDER HISTORY</h2>
      
      <div className="ordersList">
        {orderHistory.map(order => {
          const isDelivered = order.status.toLowerCase() === 'delivered';
          const isCancelled = order.status.toLowerCase() === 'cancelled';
          const canCancel = !isDelivered && !isCancelled;
          const canTrack = !isCancelled;

          return (
            <div key={order.id} className="orderCard">
              <div className="orderHeader">
                <div>
                  <h4>{order.id}</h4>
                  <p className="orderDate">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span className={`orderStatus status-${order.status.toLowerCase()}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              
              {/* Order Items with Images */}
              <div className="orderItems">
                <h5>ORDER ITEMS:</h5>
                <div className="orderItemsList">
                  {order.items.map(item => (
                    <div key={`${order.id}-${item.id}`} className="orderItem">
                      <div className="orderItemImage">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="orderItemDetails">
                        <p className="itemName">{item.name}</p>
                        <p className="itemCategory">{item.category}</p>
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

              {/* Order Action Buttons */}
              <div className="orderActions">
                {canCancel && (
                  <button 
                    onClick={() => handleCancelOrder(order.id)}
                    className="cancelOrderButton"
                  >
                    CANCEL ORDER
                  </button>
                )}
                
                {canTrack && (
                  <button 
                    onClick={() => handleTrackOrder(order.id)}
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

              {/* Order Status Timeline */}
{/* Order Status Timeline */}
{!isCancelled && (
  <div className="orderStatusTimeline">
    <h5>ORDER STATUS:</h5>
    <div className="timeline">
      <div className={`timeline-step ${order.status !== 'Cancelled' ? 'completed' : ''}`}>
        <div className="timeline-dot"></div>
        <span>Order Placed</span>
      </div>
      <div className={`timeline-step ${['Shipped', 'Delivered'].includes(order.status) ? 'completed' : ''}`}>
        <div className="timeline-dot"></div>
        <span>Shipped</span>
      </div>
      <div className={`timeline-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
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
    </div>

    
  </div>
)}

            {/* Password Section */}
            {activeSection === 'password' && (
              <div className="profileContent">
                <div className="profileSection">
                  <h2>CHANGE PASSWORD</h2>

                  <div className="profileForm">
                    <div className="formGroup">
                      <label>CURRENT PASSWORD</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="formGroup">
                      <label>NEW PASSWORD</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="formGroup">
                      <label>CONFIRM NEW PASSWORD</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="formActions">
                      <button onClick={handleSavePassword} className="submitButton">
                        UPDATE PASSWORD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
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
          <div className="profileNavigation mobile">
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
              <li>
                <a 
                  href="#logout" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                    setIsDrawerOpen(false);
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div 
          className="drawerOverlay" 
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Profile;