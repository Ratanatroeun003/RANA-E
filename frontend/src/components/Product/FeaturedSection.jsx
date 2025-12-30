import React from 'react';
import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag,
} from 'react-icons/hi2';

const FeaturedSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Featured 1*/}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className="size-6" />
          </div>
          <h2 className="tracking-tighter mb-2">FREE INTERNATIONAL SHIPPING</h2>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all over order $100.00
          </p>
        </div>
        {/* feature2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="size-6" />
          </div>
          <h2 className="tracking-tighter mb-2">45 DAYs RETURN</h2>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money back guarantee
          </p>
        </div>
        {/* feature3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="size-6" />
          </div>
          <h2 className="tracking-tighter mb-2">SECURE CHECKOUT</h2>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secured checked process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
