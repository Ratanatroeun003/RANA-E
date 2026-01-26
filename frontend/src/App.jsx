import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import { Toaster } from 'sonner';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import ProductDetail from './components/Product/ProductDetail.jsx';
import CheckedOut from './components/Cart/CheckedOut.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import OrderDetailPage from './pages/OrderDetailPage.jsx';
import MyOrderPage from './pages/MyOrderPage.jsx';
import AdminLayout from './components/Admin/AdminLayout.jsx';
import AdminHomePage from './pages/AdminHomePage.jsx';
import UserManagement from './components/Admin/UserManagement.jsx';
import ProductManagement from './components/Admin/ProductManagement.jsx';
import EditProductPage from './components/Admin/EditProductPage.jsx';
import OrderManagement from './components/Admin/Ordermanagement.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<CheckedOut />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetailPage />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />{' '}
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
