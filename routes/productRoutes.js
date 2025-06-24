const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByShop,
  getSingleProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/shop/:id', getProductsByShop);
router.get('/:id', getSingleProduct);

module.exports = router;
