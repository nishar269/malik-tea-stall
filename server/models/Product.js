const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  category: { type: String, required: true }, // "Health Mix", "Tea Powder", etc.
  description: { type: String },
  variants: [{
    weight: { type: String, required: true }, // "100g", "250g", "500g", "1kg"
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 }, // in grams/kg or units
  }],
  imageUrl: { type: String },
  isOutOfStock: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
