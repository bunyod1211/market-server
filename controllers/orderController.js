const Order = require('../models/Order');
const Product = require('../models/Product');

// Buyurtma berish
exports.createOrder = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const foundProduct = await Product.findById(product);
    if (!foundProduct) return res.status(404).json({ message: 'Mahsulot topilmadi' });

    if (foundProduct.stock < quantity) {
      return res.status(400).json({ message: 'Yetarli mahsulot yo‘q' });
    }

    // Stock kamaytirish
    foundProduct.stock -= quantity;
    await foundProduct.save();

    const totalPrice = foundProduct.price * quantity;

    const order = await Order.create({
      product,
      quantity,
      totalPrice,
      buyer: req.user._id
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Buyurtma berishda xatolik' });
  }
};

// Do‘kon buyurtmalari
exports.getOrdersByShop = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'product',
        match: { shop: req.params.id },
        populate: { path: 'shop', select: 'name' }
      })
      .populate('buyer', 'name email');

    const filtered = orders.filter(o => o.product !== null); // boshqa do‘konlar chiqmasin

    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Buyurtmalarni olishda xatolik' });
  }
};

// Foydalanuvchi buyurtmalari
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.id })
      .populate('product')
      .populate('buyer', 'name email');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Buyurtmalarni olishda xatolik' });
  }
};

// Buyurtma holatini o‘zgartirish
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Buyurtma topilmadi' });

    order.status = req.body.status;
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Holatni yangilashda xatolik' });
  }
};
