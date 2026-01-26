const express = require('express');
const Checkout = require('../Models/Checkout');
const Cart = require('../Models/Cart');
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: 'no items in checkout' });
  }
  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: 'Pending',
      isFinalize: false,
      isPaid: false,
    });
    console.log(`checkout created for user:${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});
//@router put /api/checkout/:id
//update checkout to mark as paid after successful payment
//access private
router.put('/:id/pay', protect, async (req, res) => {
  const { paymentStatus, paymentDetail } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: 'Checkout not found' });
    }
    if (paymentStatus === 'Paid') {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetail = paymentDetail;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: 'Invalid Payment Status' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// router post
//finalizes checkout and convert to an order after payment confirmation
// private access
router.post('/:id/finalize', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({
        message: 'Checkout not found',
      });
    }
    if (checkout.isPaid && !checkout.isFinalize) {
      //create final order on the checkout detail
      const finalOrder = await Order.create({
        user: checkout.user,
        // ✅ បញ្ជាក់ឱ្យច្បាស់ថា ចម្លងពី checkoutItems ទៅ orderItems
        orderItems: checkout.checkoutItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        paymentStatus: 'Paid',
      });
      //Mark the checkout as finalized
      ((checkout.isFinalize = true), (checkout.finalizeAt = Date.now()));
      await checkout.save();
      // delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalize) {
      res.status(400).json({ message: 'Checkout already finalized' });
    } else {
      res.status(400).json({
        message: 'Checkout is not paid',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
