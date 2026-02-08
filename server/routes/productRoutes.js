const express = require('express');
const router = express.Router();

const SHEETDB_API = process.env.SHEETDB_API;

// Get all products
router.get('/', async (req, res) => {
    try {
        const response = await fetch(`${SHEETDB_API}?sheet=Products`);
        const products = await response.json();

        // Transform to expected format
        const formattedProducts = products.map(p => ({
            _id: p.id,
            name: p.name,
            category: p.category,
            description: p.description,
            imageUrl: p.imageUrl,
            isOutOfStock: p.isOutOfStock === 'true' || p.isOutOfStock === true,
            variants: [
                p.price100g ? { weight: '100g', price: Number(p.price100g) } : null,
                p.price250g ? { weight: '250g', price: Number(p.price250g) } : null,
                p.price500g ? { weight: '500g', price: Number(p.price500g) } : null,
                p.price1kg ? { weight: '1kg', price: Number(p.price1kg) } : null,
            ].filter(v => v !== null)
        }));

        res.json(formattedProducts);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const response = await fetch(`${SHEETDB_API}/search?id=${req.params.id}&sheet=Products`);
        const products = await response.json();

        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const p = products[0];
        const product = {
            _id: p.id,
            name: p.name,
            category: p.category,
            description: p.description,
            imageUrl: p.imageUrl,
            isOutOfStock: p.isOutOfStock === 'true' || p.isOutOfStock === true,
            variants: [
                p.price100g ? { weight: '100g', price: Number(p.price100g) } : null,
                p.price250g ? { weight: '250g', price: Number(p.price250g) } : null,
                p.price500g ? { weight: '500g', price: Number(p.price500g) } : null,
                p.price1kg ? { weight: '1kg', price: Number(p.price1kg) } : null,
            ].filter(v => v !== null)
        };

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create product
router.post('/', async (req, res) => {
    try {
        const { name, category, description, imageUrl, variants, isOutOfStock } = req.body;

        const newProduct = {
            id: `prod_${Date.now()}`,
            name,
            category,
            description,
            imageUrl: imageUrl || '',
            price100g: variants?.find(v => v.weight === '100g')?.price || '',
            price250g: variants?.find(v => v.weight === '250g')?.price || '',
            price500g: variants?.find(v => v.weight === '500g')?.price || '',
            price1kg: variants?.find(v => v.weight === '1kg')?.price || '',
            isOutOfStock: isOutOfStock || false
        };

        const response = await fetch(`${SHEETDB_API}?sheet=Products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: newProduct })
        });

        const result = await response.json();
        res.status(201).json({ ...newProduct, _id: newProduct.id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        await fetch(`${SHEETDB_API}/id/${req.params.id}?sheet=Products`, {
            method: 'DELETE'
        });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
