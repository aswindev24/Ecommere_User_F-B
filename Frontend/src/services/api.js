// Only this API service file
// Frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'; // Your admin backend

export const offerAPI = {
    getPublicOffers: () => axios.get(`${API_BASE_URL}/api/offer-images/public`)
};