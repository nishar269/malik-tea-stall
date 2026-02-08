const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerPhone: { type: String, trim: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            variant: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
            priceAtPurchase: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['UPI', 'CASH'], required: true },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'PAID', 'CASH_PENDING', 'COMPLETED'],
        default: 'PENDING'
    },
    transactionId: { type: String, trim: true }, // Optional for Cash, needed for UPI
    status: {
        type: String,
        enum: ['NEW', 'READY_FOR_PICKUP', 'COMPLETED', 'CANCELLED'],
        default: 'NEW'
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
