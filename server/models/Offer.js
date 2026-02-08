const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    discountType: {
        type: String,
        enum: ['PERCENTAGE', 'FLAT'],
        default: 'FLAT'
    },
    discountValue: { type: Number, required: true },
    applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Offer', OfferSchema);
