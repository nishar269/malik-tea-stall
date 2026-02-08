const express = require('express');
const router = express.Router();

const SHEETDB_API = process.env.SHEETDB_API;

// Get offers (all for admin, active for users)
router.get('/', async (req, res) => {
    try {
        const response = await fetch(`${SHEETDB_API}?sheet=Offers`);
        const offers = await response.json();

        const { mode } = req.query;
        const today = new Date();

        let formattedOffers = offers.map(o => ({
            _id: o.id,
            title: o.title,
            discountType: o.discountType,
            discountValue: Number(o.discountValue),
            startDate: o.startDate,
            endDate: o.endDate,
            isActive: o.isActive === 'true' || o.isActive === true
        }));

        // Filter active offers for non-admin
        if (mode !== 'admin') {
            formattedOffers = formattedOffers.filter(o => {
                return o.isActive &&
                    new Date(o.startDate) <= today &&
                    new Date(o.endDate) >= today;
            });
        }

        res.json(formattedOffers);
    } catch (err) {
        console.error('Error fetching offers:', err);
        res.status(500).json({ message: err.message });
    }
});

// Create offer
router.post('/', async (req, res) => {
    try {
        const { title, discountType, discountValue, startDate, endDate, isActive } = req.body;

        const newOffer = {
            id: `offer_${Date.now()}`,
            title,
            discountType,
            discountValue,
            startDate,
            endDate,
            isActive: isActive !== false
        };

        await fetch(`${SHEETDB_API}?sheet=Offers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: newOffer })
        });

        res.status(201).json({ ...newOffer, _id: newOffer.id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete offer
router.delete('/:id', async (req, res) => {
    try {
        await fetch(`${SHEETDB_API}/id/${req.params.id}?sheet=Offers`, {
            method: 'DELETE'
        });
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
