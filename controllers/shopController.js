const Shop = require("../models/Shop");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createShop = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    const existing = await Shop.findOne({ slug });
    if (existing) return res.status(400).json({ message: "Slug band" });

    const shop = await Shop.create({
      name,
      slug,
      description,
      owner: req.user._id,
    });

    res.status(201).json(shop);
  } catch (err) {
    res.status(500).json({ message: "Do‘kon yaratishda xatolik" });
  }
};

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  res.status(200).json(shops);
};

exports.getShopBySlug = async (req, res) => {
  const shop = await Shop.findOne({ slug: req.params.slug });
  if (!shop) return res.status(404).json({ message: "Do‘kon topilmadi" });
  res.status(200).json(shop);
};

// Statistika olish
exports.getShopStats = async (req, res) => {
  try {
    const shopId = req.params.id;

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $match: {
          "product.shop": new require("mongoose").Types.ObjectId(shopId),
        },
      },
      {
        $group: {
          _id: "$product._id",
          productName: { $first: "$product.name" },
          totalSold: { $sum: "$quantity" },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
    ]);

    const totalSales = orders.reduce((acc, o) => acc + o.totalSold, 0);
    const totalIncome = orders.reduce((acc, o) => acc + o.totalRevenue, 0);
    const topProduct = orders[0] || null;

    res.status(200).json({
      totalSales,
      totalIncome,
      topProduct: topProduct
        ? {
            id: topProduct._id,
            name: topProduct.productName,
            sold: topProduct.totalSold,
          }
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: "Statistikani olishda xatolik" });
  }
};
