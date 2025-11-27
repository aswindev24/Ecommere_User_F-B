const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Address = require('../models/Address');

// @route   POST api/addresses
// @desc    Add a new address
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { houseName, street, type, city, state, pincode, country, phoneNumber, isDefault } = req.body;

        // If setting as default, unset other default addresses
        if (isDefault) {
            await Address.updateMany(
                { user: req.user.id, isDefault: true },
                { isDefault: false }
            );
        }

        const newAddress = new Address({
            user: req.user.id,
            houseName,
            street,
            type,
            city,
            state,
            pincode,
            country,
            phoneNumber,
            isDefault
        });

        const address = await newAddress.save();
        res.json(address);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/addresses
// @desc    Get all addresses for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(addresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/addresses/:id
// @desc    Update an address
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { houseName, street, type, city, state, pincode, country, phoneNumber, isDefault } = req.body;

    // Build address object
    const addressFields = {};
    if (houseName) addressFields.houseName = houseName;
    if (street) addressFields.street = street;
    if (type) addressFields.type = type;
    if (city) addressFields.city = city;
    if (state) addressFields.state = state;
    if (pincode) addressFields.pincode = pincode;
    if (country) addressFields.country = country;
    if (phoneNumber) addressFields.phoneNumber = phoneNumber;
    if (isDefault !== undefined) addressFields.isDefault = isDefault;

    try {
        let address = await Address.findById(req.params.id);

        if (!address) return res.status(404).json({ msg: 'Address not found' });

        // Make sure user owns address
        if (address.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // If setting as default, unset other default addresses
        if (isDefault) {
            await Address.updateMany(
                { user: req.user.id, isDefault: true },
                { isDefault: false }
            );
        }

        address = await Address.findByIdAndUpdate(
            req.params.id,
            { $set: addressFields },
            { new: true }
        );

        res.json(address);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/addresses/:id
// @desc    Delete an address
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let address = await Address.findById(req.params.id);

        if (!address) return res.status(404).json({ msg: 'Address not found' });

        // Make sure user owns address
        if (address.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Address.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Address removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
