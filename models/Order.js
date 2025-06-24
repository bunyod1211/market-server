const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ['pending', 'paid', 'delivered'],
    default: 'pending'
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
