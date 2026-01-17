import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import cartReducer from './slice/cartSlice';
import checkOutReducer from './slice/checkoutSlice';
import orderReducer from './slice/orderSlice';
import adminReducer from './slice/adminSlice';
import adminProductReducer from './slice/adminProductSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkOutReducer,
    order: orderReducer,
    admin: adminReducer,
    adminProductSlice: adminProductReducer,
  },
});

export default store;
