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
    return await Cart.findOne({ userId });
  }
  return null;
};

// Add item to cart
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
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        //product exists in cart, update quantity
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        //add new product to cart
        cart.products.push({
          productId,
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
            productId,
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
//update cart item quantity or remove item
router.put('/', async (req, res) => {
  const { productId, size, color, guestId, userId, quantity } = req.body;
  try {
    let cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      // update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove item if quantity is 0
      }
      // recalculate total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});
//delete cart
router.delete('/', async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(guestId, userId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/', async (req, res) => {
  const { guestId, userId } = req.query;
  try {
    const cart = await getCart(guestId, userId);
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
