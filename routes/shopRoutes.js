const express = require("express");
const router = express.Router();
const {
  createShop,
  getAllShops,
  getShopBySlug,
} = require("../controllers/shopController");
const { protect } = require("../middleware/auth");
const { getShopStats } = require("../controllers/shopController");

router.post("/", protect, createShop);
router.get("/", getAllShops);
router.get("/:slug", getShopBySlug);

module.exports = router;

router.get("/:id/stats", protect, getShopStats);
