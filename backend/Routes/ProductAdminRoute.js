const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();
const { protect, admin } = require('../Middleware/authMiddleware');
// router get api admin product
// get all product
// access private
router.get('/', protect, admin, async (req, res) => {
  try {
    const product = await Product.find({});
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.json({ message: 'Server Error' });
  }
});
module.exports = router;
