const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const UserRoute = require('./Routes/UserRoute');
const ProductRoute = require('./Routes/ProductRoute');
const CartRoute = require('./Routes/CartRoute');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
connectDB();
app.get('/', (req, res) => {
  res.send('hello RANA API');
});
app.use('/api/users', UserRoute);
app.use('/api/products', ProductRoute);
app.use('/api/cart', CartRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
