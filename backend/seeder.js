const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./Models/User');
const Cart = require('./Models/Cart');
const Product = require('./Models/Product');
const products = require('./data/products');
dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    // create default admin user
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: '123456',
      role: 'admin',
    });
    // assign the default admin user to all products
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
      // insert the products to database
    });
    await Product.insertMany(sampleProducts);
    console.log('Product data seeded successfully ');
    process.exit();
  } catch (error) {
    console.log('Error with data seeding', error);
    process.exit(1);
  }
};
seedData();
