const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const { protect, admin } = require('../Middleware/authMiddleware');

//@route   POST /api/products
//@desc    Create a new product
//@access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      dimensions,
      weight,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
    } = req.body;
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      dimensions,
      weight,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      user: req.user._id, // Associate product with the user creating it
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});
//@route   put /api/products
//@desc    Update a product
//@access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      materials,
      dimensions,
      weight,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.materials = materials || product.materials;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : false; // Default to false if not provided
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      const updatedProduct = await product.save();
      res.json(updatedProduct);

      // Handle isPublished separately
    } else {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});
// delete product
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      //remove product
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
