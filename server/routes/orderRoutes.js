const express = require('express');
const router = express.Router();

const SHEETDB_API = process.env.SHEETDB_API;

// Get all orders
router.get('/', async (req, res) => {
    try {
        const response = await fetch(`${SHEETDB_API}?sheet=Orders`);
        const orders = await response.json();

        // Transform and sort by date (newest first)
        const formattedOrders = orders.map(o => ({
            _id: o.id,
            customerPhone: o.customerPhone,
            items: JSON.parse(o.items || '[]'),
            paymentMethod: o.paymentMethod,
            totalAmount: Number(o.totalAmount),
            status: o.status,
            createdAt: o.createdAt
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(formattedOrders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: err.message });
    }
});

// Create order
router.post('/', async (req, res) => {
    try {
        const { customerPhone, items, paymentMethod, totalAmount, status } = req.body;

        const newOrder = {
            id: `ORD-${Date.now().toString(36).toUpperCase()}`,
            customerPhone,
            items: JSON.stringify(items),
            paymentMethod,
            totalAmount,
            status: status || 'Pending',
            createdAt: new Date().toISOString()
        };

        const response = await fetch(`${SHEETDB_API}?sheet=Orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: newOrder })
        });

        const result = await response.json();
        console.log('Order created:', newOrder.id);

        res.status(201).json({
            _id: newOrder.id,
            ...newOrder,
            items: JSON.parse(newOrder.items)
        });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update order status
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;

        await fetch(`${SHEETDB_API}/id/${req.params.id}?sheet=Orders`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { status } })
        });

        res.json({ message: 'Order updated', status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete order
router.delete('/:id', async (req, res) => {
    try {
        await fetch(`${SHEETDB_API}/id/${req.params.id}?sheet=Orders`, {
            method: 'DELETE'
        });
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
