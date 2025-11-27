import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: '',
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
            emailOrPhone: '',
            password: '',
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login(formData.emailOrPhone, formData.password);

            if (result.success) {
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (error) {
            toast.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            {/* Left Section - Image */}
            <div className="login-image-section">
                <div className="image-overlay"></div>
                <div className="image-content">
                    <h2>Your Shopping Destination</h2>
                    <p>Discover amazing products at unbeatable prices</p>
                </div>
            </div>


            {/* Right Section - Form */}
            <div className="login-form-section">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="modern-form" autoComplete="off">
                        <div className="input-group">
                            <input
                                type="text"
                                id="emailOrPhone"
                                name="emailOrPhone"
                                value={formData.emailOrPhone}
                                onChange={handleChange}
                                placeholder="Email or Phone Number"
                                required
                                autoComplete="new-email"
                            />
                            <span className="underline"></span>
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

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="form-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="register-link">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;