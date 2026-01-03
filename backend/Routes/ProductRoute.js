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
    res.status(500).json({ message: 'Server Error' });
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
    res.status(500).json({ message: 'Server Error' });
  }
});
//@route   GET /api/products
//@desc    Get all products with optional query filters
//@access  Public
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
    //filtering
    if (collection && collection.toLocaleLowerCase() !== 'all') {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== 'all') {
      query.category = category;
    }
    if (material) {
      query.materials = { $in: material.split(',') };
    }
    if (brand) {
      query.brand = { $in: brand.split(',') };
    }
    if (size) {
      query.sizes = { $in: size.split(',') };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    if (search) {
      const searchQuery = search.trim(); // លុបចន្លោះទំនេរឆ្វេងស្ដាំ
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ];
    }
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'priceAsc':
          sort = { price: 1 };
          break;
        case 'priceDesc':
          sort = { price: -1 };
          break;
        case 'popularity':
          sort = { rating: -1 };
          break;
        default:
          sort = {};
      }
    }
    // fetch products based on query
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.log('server error');
    res.status(500).json({ message: 'Server Error' });
  }
});
//@route   GET /api/products/best-sellers
//@desc    Get best-selling products
//@access  Public
router.get('/best-seller', async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ rating: -1 });
    if (bestSellers) {
      res.json(bestSellers);
    } else {
      res.status(404).json({ message: 'No best-selling products found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
//@route   GET /api/products/new-arrivals
//@desc    Get Retrieve latest 8 products-Creation date
//@access  Public
router.get('/new-arrival', async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// get single product
//@route   GET /api/products/:id
//@desc    Get single product by ID
//@access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// @router GET /api/products/similar/:id
// @desc Get similar products based on category
// @access Public
router.get('/similar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
      gender: product.gender,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
