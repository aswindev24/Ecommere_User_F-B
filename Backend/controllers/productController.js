const Product = require('../models/Product');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category')
            .populate('subCategory');
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get products by category name
// @route   GET /api/products/category/:categoryName
// @access  Public
exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;

        // Case insensitive search for category
        const category = await Category.findOne({
            name: { $regex: new RegExp(`^${categoryName}$`, 'i') }
        });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        const products = await Product.find({ category: category._id })
            .populate('category')
            .populate('subCategory');

        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category')
            .populate('subCategory');

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
