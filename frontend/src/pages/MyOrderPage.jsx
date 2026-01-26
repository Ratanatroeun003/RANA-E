import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slice/orderSlice';

const MyOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto py-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 text-nowrap text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >
                  {/* Image */}
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="size-10 sm:size-12 object-cover rounded-lg"
                    />
                  </td>
                  {/* Order ID */}
                  <td className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  {/* Created Date */}
                  <td className="py-2 px-4 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  {/* Shipping */}
                  <td className="py-2 px-4 whitespace-nowrap">
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.country}
                  </td>
                  {/* Items */}
                  <td className="py-2 px-4">{order.orderItems.length}</td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    ${order.totalPrice}
                  </td>
                  {/* Status */}
                  <td className="p-2">
                    <span
                      className={` ${
                        order.isPaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      } px-2 py-2 rounded-full text-xs font-medium`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
