// backend/routes/offerImageRoutes.js
const express = require('express');
const router = express.Router();
const OfferImage = require('../models/OfferImage.js');


router.get('/fetch-adminOfferImages', async (req, res) => {
    try {
        const now = new Date();
        const offers = await OfferImage.find({
            status: 'active',
            $or: [
                { startDate: null, endDate: null },
                { startDate: { $lte: now }, endDate: { $gte: now } },
                { startDate: { $lte: now }, endDate: null },
                { startDate: null, endDate: { $gte: now } }
            ]
        }).sort({ displayOrder: 1 });

        console.log("✅ fetch-adminOfferImages API called");

        const imagesOnly = offers.map(o => ({
            _id: o._id,
            image: o.image
        }));

        res.json({ success: true, offers: imagesOnly });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


module.exports = router;