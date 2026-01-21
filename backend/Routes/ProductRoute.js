const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const { protect, admin } = require('../Middleware/authMiddleware');

// ==========================================
// ១. SPECIFIC ROUTES (ដាក់នៅខាងលើគេបង្អស់)
// ==========================================

//@route   GET /api/products/new-arrivals
router.get('/new-arrivals', async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

//@route   GET /api/products/best-sellers
router.get('/best-seller', async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ rating: -1 });
    res.json(bestSellers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

//@route   GET /api/products/similar/:id
router.get('/similar/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: req.params.id },
      gender: product.gender,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// ២. GENERAL ROUTES (Filter & Create)
// ==========================================

//@route   GET /api/products (Filter & Search)
router.get('/', async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      search,
      material,
      limit,
      category,
      brand,
      minPrice,
      maxPrice,
      sortBy,
    } = req.query;
    let query = {};

    if (collection && collection.toLowerCase() !== 'all')
      query.collections = collection;
    if (category && category.toLowerCase() !== 'all') query.category = category;
    if (material) query.materials = { $in: material.split(',') };
    if (brand) query.brand = { $in: brand.split(',') };
    if (size) query.sizes = { $in: size.split(',') };
    if (color) query.colors = { $in: [color] };
    if (gender) query.gender = gender;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    let sort = {};
    if (sortBy === 'priceAsc') sort = { price: 1 };
    else if (sortBy === 'priceDesc') sort = { price: -1 };
    else if (sortBy === 'popularity') sort = { rating: -1 };

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

//@route   POST /api/products
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product({ ...req.body, user: req.user._id });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// ==========================================
// ៣. DYNAMIC ID ROUTES (ដាក់នៅខាងក្រោមគេបង្អស់)
// ==========================================

//@route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

//@route   PUT /api/products/:id
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

//@route   DELETE /api/products/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
