import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css'; // Import the CSS file

const PersonalInfo = () => {
    const { user, updateProfile } = useAuth();
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: ''
    });

    // Initialize personal info from user data
    useEffect(() => {
        if (user) {
            setPersonalInfo({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                dateOfBirth: user.dateOfBirth
                    ? new Date(user.dateOfBirth).toISOString().split('T')[0]
                    : '',
                gender: user.gender || ''
            });
        }
    }, [user]);

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

    return (
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
                                <option value="">Select Gender</option>
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
                        <span className="value">
                            {personalInfo.dateOfBirth
                                ? new Date(personalInfo.dateOfBirth).toLocaleDateString()
                                : 'Not set'
                            }
                        </span>
                    </div>
                    <div className="displayRow">
                        <span className="label">GENDER:</span>
                        <span className="value">
                            {personalInfo.gender
                                ? personalInfo.gender.charAt(0).toUpperCase() +
                                personalInfo.gender.slice(1).replace('-', ' ')
                                : 'Not set'
                            }
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo;