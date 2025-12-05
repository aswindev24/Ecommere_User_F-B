import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const { isAuthenticated } = useAuth();

    const fetchCartCount = async () => {
        if (!isAuthenticated) {
            setCartCount(0);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success && response.data.cart) {
                const count = response.data.cart.items.reduce((acc, item) => acc + item.quantity, 0);
                setCartCount(count);
            } else {
                setCartCount(0);
            }
        } catch (error) {
            console.error('Error fetching cart count:', error);
            // Don't reset count on error to avoid flickering if it's a transient issue, 
            // but maybe we should if it's auth error. For now, keep as is.
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, [isAuthenticated]);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
