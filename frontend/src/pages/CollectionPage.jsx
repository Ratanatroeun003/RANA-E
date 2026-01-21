import { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Filtersidebar from '../components/Product/FilterSideBar';
import SortOptions from '../components/Product/SortOptions';
import ProductGrid from '../components/Product/ProductGrid.jsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilter } from '../redux/slice/productSlice.js';
const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParam] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParam]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchProductsByFilter({ collection, ...queryParams }));
  }, [dispatch, searchParam, collection]);
  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    // closesidebar if click outsidei
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
