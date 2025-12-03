const mongoose = require('mongoose');
require('dotenv').config();

async function fixOrderIndex() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        // Get the orders collection
        const db = mongoose.connection.db;
        const ordersCollection = db.collection('orders');

        // List all indexes
        console.log('\nCurrent indexes:');
        const indexes = await ordersCollection.indexes();
        console.log(JSON.stringify(indexes, null, 2));

        // Drop the orderNumber_1 index if it exists
        try {
            await ordersCollection.dropIndex('orderNumber_1');
            console.log('\n✓ Successfully dropped orderNumber_1 index');
        } catch (error) {
            if (error.code === 27) {
                console.log('\n✓ orderNumber_1 index does not exist (already removed)');
            } else {
                throw error;
            }
        }

        // List indexes after dropping
        console.log('\nIndexes after cleanup:');
        const indexesAfter = await ordersCollection.indexes();
        console.log(JSON.stringify(indexesAfter, null, 2));

        console.log('\n✓ Index cleanup completed successfully!');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error fixing order index:', error);
        process.exit(1);
    }
}

fixOrderIndex();
