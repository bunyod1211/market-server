const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  imageUrl: String,
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
