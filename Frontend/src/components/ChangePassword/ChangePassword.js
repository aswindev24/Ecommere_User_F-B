// components/ChangePassword.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import '../../pages/users/Login.css'

const ChangePassword = () => {
    const { changePassword } = useAuth();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const validatePassword = () => {
        if (!passwordData.currentPassword) {
            toast.error('Please enter your current password');
            return false;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long!');
            return false;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match!');
            return false;
        }

        if (passwordData.currentPassword === passwordData.newPassword) {
            toast.error('New password must be different from current password');
            return false;
        }

        return true;
    };

    const handleSavePassword = async () => {
        if (!validatePassword()) {
            return;
        }

        setLoading(true);

        try {
            const result = await changePassword(
                passwordData.currentPassword,
                passwordData.newPassword
            );

            if (result.success) {
                toast.success('Password updated successfully!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                toast.error(result.message || 'Failed to update password');
            }
        } catch (error) {
            toast.error('An error occurred while updating password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="change-password-section">
            <h2>CHANGE PASSWORD</h2>

            <div className="profileForm">
                <div className="formGroup">
                    <label>CURRENT PASSWORD</label>
                    <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                        placeholder="Enter current password"
                        disabled={loading}
                    />
                </div>
                <div className="formGroup">
                    <label>NEW PASSWORD</label>
                    <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        placeholder="Enter new password"
                        disabled={loading}
                    />
                    <div className="password-hint">
                        Password must be at least 6 characters long
                    </div>
                </div>
                <div className="formGroup">
                    <label>CONFIRM NEW PASSWORD</label>
                    <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        placeholder="Confirm new password"
                        disabled={loading}
                    />
                </div>

                <div className="formActions">
                    <button
                        onClick={handleSavePassword}
                        className="submitButton"
                        disabled={loading}
                    >
                        {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;