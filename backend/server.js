const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const UserRoute = require('./Routes/UserRoute');
const ProductRoute = require('./Routes/ProductRoute');
const CartRoute = require('./Routes/CartRoute');
const checkoutRout = require('./Routes/CheckoutRout');
const orderRout = require('./Routes/OrderRout');
const UploadRout = require('./Routes/UploadRout');
const SubscriberRout = require('./Routes/SubscriberRoute');
const AdminRoute = require('./Routes/AdminRoutes');
const ProductAdminRout = require('./Routes/ProductAdminRoute');
const AdminOrderRout = require('./Routes/AdminOrderRoute');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
connectDB();
app.get('/', (req, res) => {
  res.send('hello RANA_E API');
});
app.use('/api/users', UserRoute);
app.use('/api/products', ProductRoute);
app.use('/api/cart', CartRoute);
app.use('/api/checkout', checkoutRout);
app.use('/api/orders', orderRout);
app.use('/api/upload', UploadRout);
app.use('/api', SubscriberRout);
//admin
app.use('/api/admin/users', AdminRoute);
app.use('/api/admin/products', ProductAdminRout);
app.use('/api/admin/orders', AdminOrderRout);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
