const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    houseName: {
        type: String,
        required: [true, 'House/Flat name is required'],
        trim: true
    },
    street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Home', 'Work', 'Other'],
        default: 'Home'
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Address', addressSchema);
