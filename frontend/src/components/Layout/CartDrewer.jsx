import { IoClose } from 'react-icons/io5';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const CartDrewer = ({ drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    toggleDrawer();
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[20rem] h-full bg-white shadow-lg flex flex-col z-50 ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* closebutton */}
      <div className="flex justify-end p-4">
        <button onClick={toggleDrawer}>
          <IoClose className="size-6" />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-auto ">
        <h2 className="font-semibold text-md">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="p-4 bottom-0 text-white bg-gray-200">
        {cart && cart?.products?.length && (
          <>
            <button
              onClick={handleCheckout}
              className="bg-black w-full font-semibold py-2 mx-auto rounded-md mb-2 text-md"
            >
              Check Out
            </button>

            <p className=" text-sm  rounded-md text-black">
              Shopping , Taxes, and discount codes calculate at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrewer;
