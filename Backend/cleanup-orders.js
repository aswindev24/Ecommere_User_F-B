const mongoose = require('mongoose');
require('dotenv').config();

async function cleanupOrders() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        // Get the orders collection
        const db = mongoose.connection.db;
        const ordersCollection = db.collection('orders');

        // Find orders with null orderNumber
        const ordersWithNullOrderNumber = await ordersCollection.find({ orderNumber: null }).toArray();
        console.log(`\nFound ${ordersWithNullOrderNumber.length} orders with null orderNumber`);

        if (ordersWithNullOrderNumber.length > 0) {
            console.log('\nDeleting orders with null orderNumber...');
            const result = await ordersCollection.deleteMany({ orderNumber: null });
            console.log(`✓ Deleted ${result.deletedCount} orders`);
        }

        console.log('\n✓ Cleanup completed successfully!');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error cleaning up orders:', error);
        process.exit(1);
    }
}

cleanupOrders();
