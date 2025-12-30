import { RiDeleteBin3Line } from 'react-icons/ri';
const CartContent = () => {
  const cartProducts = [
    {
      productId: 1,
      name: 'T-shirt',
      size: 'M',
      color: 'Red',
      quanity: 2,
      price: 20,
      Image: 'https://picsum.photos/200/?random=1',
    },
    {
      productId: 2,
      name: 'T-shirt',
      size: 'M',
      color: 'blue',
      quanity: 1,
      price: 25,
      Image: 'https://picsum.photos/200/?random=1',
    },
    {
      productId: 3,
      name: 'T-shirt',
      size: 'M',
      color: 'black',
      quanity: 2,
      price: 30,
      Image: 'https://picsum.photos/200/?random=1',
    },
  ];
  return (
    <div>
      {cartProducts.map((products, index) => (
        <div key={index} className="cart-item">
          <div className="flex items-start justify-start  py-4 border-b">
            <img
              src={products.Image}
              alt=""
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div className="text-sm">
              <h3 className="text-gray-500">{products.name}</h3>
              <p className="text-gray-500">
                size:{products.size} | color:{products.color}
              </p>
              <button className="border px-1"> - </button>
              <span className="px-2">{products.quanity}</span>
              <button className="border px-1"> + </button>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <p className="font-semibold text-md">${products.price}</p>
              <button>
                <RiDeleteBin3Line className="size-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
