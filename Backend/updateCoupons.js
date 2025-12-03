const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');
const dotenv = require('dotenv');

dotenv.config();

const updateCoupons = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1); // Set to 1 year from now

        const result = await Coupon.updateMany(
            {},
            { $set: { expiryDate: futureDate, isActive: true } }
        );

        console.log(`Updated ${result.modifiedCount} coupons to expire on ${futureDate}`);

        const coupons = await Coupon.find({});
        console.log('Current Coupons:', coupons);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateCoupons();
