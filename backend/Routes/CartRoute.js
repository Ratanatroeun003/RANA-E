const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const Cart = require('../Models/Cart');
const { protect } = require('../Middleware/authMiddleware');

//@router/post /api/cart
//@desc    Add item to cart for a quested or logged in user
//@access  Private
const getCart = async (guestId, userId) => {
  if (guestId) {
    return await Cart.findOne({ guestId });
  } else if (userId) {
    return await Cart.findOne({ user: userId });
  }
  return null;
};
router.post('/', async (req, res) => {
  const { productId, size, color, quantity, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    //Determine if the user is logged in or a guest
    let cart = await getCart(guestId, userId);
    // if cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.product.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        //product exists in cart, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        //add new product to cart
        cart.products.push({
          product: productId,
          name: product.name,
          image: product.images[0]?.url || '',
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      //recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create new cart for user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : 'guest_' + new Date().getTime(),
        products: [
          {
            product: productId,
            name: product.name,
            image: product.images[0]?.url || '',
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
