const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { protect, admin } = require('../Middleware/authMiddleware');
// router get admin user
// get all user
// access private
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});
// router post admin users
// add new users (admin only)
// access private
router.post('/', protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: 'User already exist' });
    }
    user = new User({
      name,
      email,
      password,
      role: role || 'customer',
    });
    await user.save();
    return res.status(201).json({ message: 'User added successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// router put api admin user
// update user info admin only Name email role
// access private admin only
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      ((user.name = req.body.name || user.name),
        (user.email = req.body.email || user.email),
        (user.role = req.body.role || user.role));
    }
    const updateUser = await user.save();
    res
      .status(201)
      .json({ message: 'User update successfully', user: updateUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});
// router delete
// delete users
// access private admin only
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({
        message: 'User deleted successfully',
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
