import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrewer from '../Layout/CartDrewer';
import { IoClose } from 'react-icons/io5';
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto py-4 px-6 flex items-center justify-between">
        {/* left logo */}
        <div>
          <Link to={'/'} className="text-lg font-semibold ">
            RANA
          </Link>
        </div>
        {/* center navigation link */}
        <div className="hidden md:flex space-x-6">
          <Link to={'/collections/all'}>MEN</Link>
          <Link to={'#'}>WEMEN</Link>
          <Link to={'#'}>TOP WEAR</Link>
          <Link to={'#'}>BUTTOM WEAR</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={'/admin'}
            className="block bg-black px-2 rounded text-sm text-white"
          >
            Admin
          </Link>
          <Link to={'/profile'} className="hover:text-black">
            <HiOutlineUser className="size-6" />
          </Link>
          <button className="relative" onClick={toggleDrawer}>
            <HiOutlineShoppingBag className="size-6" />
            <span className="absolute rounded-full -top-1 bg-red-700 text-white text-xs w-4 h-4 flex items-center justify-center py-1\2 px-2">
              4
            </span>
          </button>
          {/* searchbar */}
          <div className="overflow-hidden">
            {' '}
            <SearchBar />
          </div>

          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="size-6" />
          </button>
        </div>
      </nav>
      <CartDrewer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      {/* mobile nav drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoClose className="size-6" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-500">Menu</h2>
          <nav className="space-y-4 p-4">
            <Link
              to={'/'}
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to={'/'}
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to={'/'}
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top wear
            </Link>
            <Link
              to={'/'}
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Buttom wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
