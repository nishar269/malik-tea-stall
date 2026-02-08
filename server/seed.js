const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        name: 'Badam Drink Mix',
        category: 'Health Mix',
        description: 'Natural Badam Powder with no preservatives. Add to Milk Hot or Cold for instant energy.',
        imageUrl: '/images/products/badam-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 120, stock: 50 },
            { weight: '250g', price: 280, stock: 30 },
            { weight: '500g', price: 520, stock: 20 },
        ],
    },
    {
        name: 'Pista Badam Drink Mix',
        category: 'Health Mix',
        description: 'Natural Pistachio Badam blend. No Preservatives. Add to Milk Hot or Cold.',
        imageUrl: '/images/products/pista-badam-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 150, stock: 40 },
            { weight: '250g', price: 350, stock: 25 },
            { weight: '500g', price: 650, stock: 15 },
        ],
    },
    {
        name: 'Ragi Malt',
        category: 'Health Mix',
        description: 'Natural Ragi Health Mix. Rich with Calcium. Delicious & Nutritious.',
        imageUrl: '/images/products/ragi-malt.png',
        isOutOfStock: false,
        variants: [
            { weight: '250g', price: 180, stock: 35 },
            { weight: '500g', price: 340, stock: 20 },
            { weight: '1kg', price: 650, stock: 10 },
        ],
    },
    {
        name: 'Sonti Powder (Dry Ginger)',
        category: 'Health Mix',
        description: 'Natural Dry Ginger Powder. No Preservatives. Excellent for cold relief and digestion.',
        imageUrl: '/images/products/sonti-powder.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 100, stock: 60 },
            { weight: '250g', price: 230, stock: 40 },
        ],
    },
    {
        name: 'Lemon Tea Mix',
        category: 'Tea Powder',
        description: 'Refreshing Lemon Tea powder. Perfect blend of tea and lemon for a tangy, energizing drink.',
        imageUrl: '/images/products/lemon-tea-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 80, stock: 50 },
            { weight: '250g', price: 180, stock: 35 },
            { weight: '500g', price: 340, stock: 20 },
        ],
    },
    {
        name: 'Ginger Tea',
        category: 'Tea Powder',
        description: 'Traditional Ginger Tea powder. Warming and soothing, perfect for monsoons and winters.',
        imageUrl: '/images/products/ginger-tea.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 90, stock: 45 },
            { weight: '250g', price: 200, stock: 30 },
            { weight: '500g', price: 380, stock: 15 },
        ],
    },
    {
        name: 'Green Tea Mix',
        category: 'Tea Powder',
        description: 'Premium Green Tea blend. Rich in antioxidants for a healthy lifestyle.',
        imageUrl: '/images/products/green-tea-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 120, stock: 40 },
            { weight: '250g', price: 280, stock: 25 },
            { weight: '500g', price: 520, stock: 10 },
        ],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        const result = await Product.insertMany(products);
        console.log(`✅ Seeded ${result.length} products successfully!`);

        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

seedDB();
