import { IoClose } from 'react-icons/io5';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router-dom';
const CartDrewer = ({ drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    toggleDrawer();
    navigate('/checkout');
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
        <CartContent />
      </div>
      <div className="p-4 bottom-0 text-white bg-gray-200">
        <button
          onClick={handleCheckout}
          className="bg-black w-full font-semibold py-2 mx-auto rounded-md mb-2 text-md"
        >
          Check Out
        </button>

        <p className=" text-sm  rounded-md text-black">
          Shopping , Taxes, and disscound codes calculate at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrewer;
