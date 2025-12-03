const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');
const dotenv = require('dotenv');

dotenv.config();

const checkCoupons = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        const count = await Coupon.countDocuments({});
        console.log(`Total Coupons in DB: ${count}`);

        const activeCoupons = await Coupon.find({ isActive: true });
        console.log(`Active Coupons: ${activeCoupons.length}`);
        console.log(JSON.stringify(activeCoupons, null, 2));

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkCoupons();
