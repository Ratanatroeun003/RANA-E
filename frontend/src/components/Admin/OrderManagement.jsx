import React from 'react';

const OrderManagement = () => {
  const orders = [
    {
      _id: 123,
      user: {
        name: 'Ratana',
      },
      totalPrice: 110,
      status: 'Processing',
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xl uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
