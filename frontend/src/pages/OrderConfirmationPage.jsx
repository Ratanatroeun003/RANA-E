const checkout = {
  _id: 12323,
  createAt: new Date(),
  checkoutItems: [
    {
      productId: '1',
      name: 'jacket',
      color: 'black',
      size: 'M',
      price: 150,
      quantity: 1,
      image: 'https://picsum.photos/150?random=1',
    },
    {
      productId: '2',
      name: 'T-Shirt',
      color: 'black',
      size: 'M',
      price: 159,
      quantity: 1,
      image: 'https://picsum.photos/150?random=2',
    },
  ],
  shoppingAddress: {
    address: '123 clothing brand',
    city: 'Phnom Penh',
    country: 'Cambodia',
  },
};

const OrderConfirmationPage = () => {
  const culculateEstimatedDelivery = (createAt) => {
    const orderDate = new Date(createAt);
    orderDate.setDate(orderDate.getDate() + 10); // add 10 day to the order date
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Your Order
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20 ">
            {/* order id and date */}
            <div>
              <h2 className="text-xl font-semibold ">OrderId:{checkout._id}</h2>
              <p className="text-gray-500">
                Order date:{new Date(checkout.createAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{''}
                {culculateEstimatedDelivery(checkout.createAt)}
              </p>
            </div>
          </div>
          {/* order itmes */}
          <div className="mb-20">
            {checkout.checkoutItems.map((items) => (
              <div key={items.productId} className="flex items-center mb-4">
                <img
                  src={items.image}
                  alt={items.name}
                  className="size-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{items.name}</h4>
                  <p className="text-sm text-gray-500">
                    {items.color} | {items.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${items.price}</p>
                  <p className="text-sm text-gray-500 ">Qty:{items.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* payment and delivery info */}
          <div className="grid grid-cols-2 gap-8">
            {/* payment info */}
            <div>
              <h4 className="text-lg font-semibold mb-2 ">Payment</h4>
              <p className="text-gray-500 text-sm">Pay Pal</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shoppingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shoppingAddress.city},{''}
                {checkout.shoppingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
