import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io5';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';
const Footer = () => {
  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Newsletter */}
        <div>
          <h3 className="text-gray-800 mb-4 text-xl font-semibold">
            Newsletter
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>

          <p className="text-sm font-medium mb-4 text-gray-600">
            Sign up and get 10% off for your first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border-l border-b border-t text-sm border-gray-300 px-4 py-2  rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="bg-rose-500 rounded-r-md px-2 text-sm text-white font-medium transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to={'#'}>Men's top wear</Link>
            </li>
            <li>
              <Link to={'#'}>Women's top wear</Link>
            </li>
            <li>
              <Link to={'#'}>Men's bottom wear</Link>
            </li>
            <li>
              <Link to={'#'}>Women's bottom wear</Link>
            </li>
          </ul>
        </div>
        {/* supportlink */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to={'#'}>Contact us</Link>
            </li>
            <li>
              <Link to={'#'}>About us</Link>
            </li>
            <li>
              <Link to={'#'}>FAQs</Link>
            </li>
            <li>
              <Link to={'#'}>Features</Link>
            </li>
          </ul>
        </div>
        {/* Folllowus */}
        <div>
          <h3 className="text-gray-800 text-lg mb-4 font-bold">Follow us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener norefferer"
              className="hover:text-gray-400"
            >
              <TbBrandMeta />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener norefferer"
              className="hover:text-gray-400"
            >
              <RiTwitterXLine />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener norefferer"
              className="hover:text-gray-400"
            >
              <IoLogoInstagram />
            </a>
          </div>
          <p>Call Us</p>
          <p className="mt-2">
            <FiPhoneCall /> (+855) 71 440 7205
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-center text-gray-500 text-sm tracking-tighter">
          © 2025, CompileTap. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
