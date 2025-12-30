import { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Filtersidebar from '../components/Product/FilterSideBar';
import SortOptions from '../components/Product/SortOptions';
import ProductGrid from '../components/Product/ProductGrid.jsx';
const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebaropen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebaropen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    // closesidebar if click outsidei
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebaropen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProduct = [
        {
          _id: 5,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=7',
            },
          ],
        },
        {
          _id: 6,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=8',
            },
          ],
        },
        {
          _id: 7,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=9',
            },
          ],
        },
        {
          _id: 8,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=10',
            },
          ],
        },
        {
          _id: 9,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=11',
            },
          ],
        },
        {
          _id: 10,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=12',
            },
          ],
        },
        {
          _id: 11,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=13',
            },
          ],
        },
        {
          _id: 12,
          name: 'Product name1',
          price: 100,
          image: [
            {
              url: 'https://picsum.photos/500/500?random=14',
            },
          ],
        },
      ];
      setProducts(fetchedProduct);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>
      {/* filtersidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-50 w-64 left-0 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <Filtersidebar />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-xl font-semibold">All Collections</h2>
        {/* sort option */}
        <SortOptions />
        {/* ProductGrid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
