import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/auth';

    // Load user profile on mount if token exists
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                } catch (error) {
                    console.error('Error loading user:', error);
                    // Token might be invalid, clear it
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    const login = async (emailOrPhone, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                emailOrPhone,
                password,
            });

            if (response.data.success) {
                const { token: newToken, user: userData } = response.data;
                localStorage.setItem('token', newToken);
                setToken(newToken);
                setUser(userData);
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);

            if (response.data.success) {
                const { token: newToken, user: newUser } = response.data;
                localStorage.setItem('token', newToken);
                setToken(newToken);
                setUser(newUser);
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateProfile = async (updates) => {
        try {
            const response = await axios.put(`${API_URL}/profile`, updates, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setUser(response.data.user);
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            console.error('Profile update error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Update failed',
            };
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const response = await axios.put(`${API_URL}/change-password`,
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            console.error('Password change error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Password change failed',
            };
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!token && !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
