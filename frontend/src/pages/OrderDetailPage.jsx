import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  useEffect(() => {
    const mockOrderDetail = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: true,
      paymentMethod: 'PayPal',
      shippingMethod: 'Standard',
      shippingAddress: { city: 'Phnom Penh', country: 'Cambodia' },
      orderItems: [
        {
          productId: '1',
          name: 'jacket',
          price: 120,
          quantity: 1,
          image: 'https://picsum.photos/150?random=1',
        },
        {
          productId: '2',
          name: 'jacket',
          price: 150,
          quantity: 2,
          image: 'https://picsum.photos/150?random=2',
        },
      ],
    };
    setOrderDetail(mockOrderDetail);
  }, [id]);
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 ">Order Detail</h2>
      {!orderDetail ? (
        <p>No Order detail found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetail._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetail.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetail.isPaid
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetail.isPaid ? 'Approve' : 'Pandding'}
              </span>
              <span
                className={`${
                  orderDetail.isDelivered
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetail.isDelivered ? 'Delivered' : 'Pandding Delivered'}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Methos: {orderDetail.paymentMethod}</p>
              <p>status: {orderDetail.isPaid ? 'Paid' : 'Unpaid'}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetail.shippingMethod}</p>
              <p>
                Address: {orderDetail.shippingAddress.city},
                {orderDetail.shippingAddress.country}
              </p>
            </div>
          </div>
          {/* product list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">UniPrice</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.orderItems.map((items) => (
                  <tr key={items.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={items.image}
                        alt={items.name}
                        className="size-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/product/${items.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {items.name}
                      </Link>
                    </td>
                    <td className="px-2 py-4 ">{items.price}</td>
                    <td className="px-2 py-4 ">{items.quantity}</td>
                    <td className="px-2 py-4 ">
                      {items.price * items.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* back to orders link */}
          <Link to={'/my-orders'} className="text-blue-500 hover:underline">
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
