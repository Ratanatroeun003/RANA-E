const express = require('express');
const router = express.Router();
const Subscriber = require('../Models/Subscriber');
// router post api subscribe
// handle new subscriber letter
// access public
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email are required' });
  }
  try {
    // check if the email is subscribed
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: 'Email Already subscribed' });
    }
    // crete new subscribe
    subscriber = new Subscriber({ email });
    await subscriber.save();
    return res.status(200).json({ message: 'Successful Subscriber' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});
module.exports = router;
