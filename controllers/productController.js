const Product = require('../models/Product');

// Mahsulot qo‘shish
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, imageUrl, shop } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      imageUrl,
      shop
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Mahsulot qo‘shishda xatolik' });
  }
};

// Mahsulotni yangilash
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Mahsulot topilmadi' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Yangilashda xatolik' });
  }
};

// Mahsulotni o‘chirish
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Mahsulot topilmadi' });
    res.status(200).json({ message: 'Mahsulot o‘chirildi' });
  } catch (err) {
    res.status(500).json({ message: 'O‘chirishda xatolik' });
  }
};

// Do‘konga tegishli mahsulotlar
exports.getProductsByShop = async (req, res) => {
  try {
    const products = await Product.find({ shop: req.params.id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Mahsulotlarni olishda xatolik' });
  }
};

// Bitta mahsulot
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Mahsulot topilmadi' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Mahsulotni olishda xatolik' });
  }
};
