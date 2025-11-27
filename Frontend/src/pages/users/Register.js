import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Register.css';

// Import your image
import RegisterImage from '../../Assets/CommonImages/Login_wall.jpg'; // Update with your actual image path

const Register = () => {
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Clear form data when component mounts
    useEffect(() => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            gender: '',
            password: '',
            confirmPassword: '',
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        // Email validation
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        // Phone number validation (basic)
        if (formData.phoneNumber.length < 10) {
            toast.error('Please enter a valid phone number');
            return false;
        }

        // Password validation
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        // Confirm password
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        // Date of birth validation
        if (!formData.dateOfBirth) {
            toast.error('Please select your date of birth');
            return false;
        }

        // Gender validation
        if (!formData.gender) {
            toast.error('Please select your gender');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...registrationData } = formData;
            const result = await register(registrationData);

            if (result.success) {
                toast.success('Registration successful!');
                navigate('/');
            } else {
                toast.error(result.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            {/* Left Section - Image */}
            <div
                className="register-image-section"
                style={{ backgroundImage: `url(${RegisterImage})` }}
            >
                <div className="image-overlay"></div>
                <div className="image-content">
                    <h2>Join Our Community</h2>
                    <p>Create an account and enjoy exclusive deals</p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="register-form-section">
                <div className="form-container">
                    <div className="register-header">
                        <h1>Create Account</h1>
                        <p>Join us and start shopping</p>
                    </div>

                    <form onSubmit={handleSubmit} className="modern-form" autoComplete="off">
                        <div className="form-row">
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    required
                                    autoComplete="new-first-name"
                                />
                                <span className="underline"></span>
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    required
                                    autoComplete="new-last-name"
                                />
                                <span className="underline"></span>
                            </div>
                        </div>

                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                required
                                autoComplete="new-email"
                            />
                            <span className="underline"></span>
                        </div>

                        <div className="input-group">
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                required
                                autoComplete="new-phone"
                            />
                            <span className="underline"></span>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-birthday"
                                />
                                <span className="underline"></span>
                            </div>

                            <div className="input-group">
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-gender"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <span className="underline"></span>
                            </div>
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                autoComplete="new-password"
                            />
                            <span className="underline"></span>
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                required
                                autoComplete="new-password"
                            />
                            <span className="underline"></span>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="login-link">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;