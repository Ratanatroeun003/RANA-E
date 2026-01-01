const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { protect } = require('../Middleware/authMiddleware');
const jwt = require('jsonwebtoken');

//@route   POST /api/users/register
//@desc    Register a new user
//@access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password });
    await user.save();
    // Create JWT
    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '40h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '40h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/profile', protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {}
});
module.exports = router;
