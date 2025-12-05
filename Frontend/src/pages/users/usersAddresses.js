import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

const Addresses = () => {
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
    );
};

export default Addresses;