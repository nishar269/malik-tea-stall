const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get('/', (req, res) => {
    res.send('Malik Tea Stall API is running (Google Sheets)...');
});

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Using Google Sheets via SheetDB`);
});
