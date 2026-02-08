const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Simple admin credentials (for demo - in production use proper auth)
const ADMIN_USER = {
    username: 'admin',
    password: 'admin',
    role: 'ADMIN'
};

// Admin Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        const token = jwt.sign(
            { username, role: ADMIN_USER.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            token,
            user: { username, role: ADMIN_USER.role }
        });
    }

    res.status(400).json({ message: 'Invalid credentials' });
});

// Change Password (simple version for demo)
router.post('/change-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (currentPassword === ADMIN_USER.password) {
        // In a real app, you'd update the password in database
        // For demo, just acknowledge
        res.json({ msg: 'Password change acknowledged (demo mode)' });
    } else {
        res.status(400).json({ msg: 'Current password is incorrect' });
    }
});

// Setup route (not needed for simple auth but kept for compatibility)
router.post('/setup', (req, res) => {
    res.json({ message: 'Using simple auth - no setup needed' });
});

module.exports = router;
