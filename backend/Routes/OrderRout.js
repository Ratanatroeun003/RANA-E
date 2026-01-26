const express = require('express');
const Order = require('../Models/Order');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();
// @router / get / api /order/my-order
//@des / get / logged-in / users order
// @access private
router.get('/my-order', protect, async (req, res) => {
  try {
    // Fine order for order authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// @router//get/api/order/:id
//desc vGet order detail by id
// access private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email',
    );
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
