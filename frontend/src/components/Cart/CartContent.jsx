import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../../redux/slice/cartSlice';
const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle add or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuery = quantity + delta;
    if (newQuery >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuery,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      }),
    );
  };
  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="cart-item">
          <div className="flex items-start justify-start  py-4 border-b">
            <img
              src={product.image}
              alt=""
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div className="text-sm">
              <h3 className="text-gray-500">{product.name}</h3>
              <p className="text-gray-500">
                size:{product.size} | color:{product.color}
              </p>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="border rounded px-2 py-1 text-xl font-medium"
              >
                {' '}
                -{' '}
              </button>
              <span className="px-2">{product.quantity}</span>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color,
                  )
                }
                className="border rounded px-2 py-1 text-xl font-medium"
              >
                {' '}
                +{' '}
              </button>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <p className="font-semibold text-md">${product.price}</p>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color,
                  )
                }
              >
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
