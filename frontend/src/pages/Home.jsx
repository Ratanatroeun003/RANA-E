import { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero.jsx';
import GenderCollection from '../components/Product/GenderCollection.jsx';
import NewArrivals from '../components/Product/NewArrivals.jsx';
import ProductDetail from '../components/Product/ProductDetail.jsx';
import ProductGrid from '../components/Product/ProductGrid.jsx';
import FeatureCollection from '../components/Product/FeatureCollection.jsx';
import FeaturedSection from '../components/Product/FeaturedSection.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilter } from '../redux/slice/productSlice.js';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  useEffect(() => {
    dispatch(
      fetchProductsByFilter({
        gender: 'Women',
        category: 'Bottom Wear',
        limit: 8,
      }),
    );
    // fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <h2 className="text-center text-3xl font-bold mb-4 text-purple-400">
        Best Seller
      </h2>
      {bestSellerProduct ? (
        <ProductDetail productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}
      <div className="container mx-auto">
        <h2 className="text-purple-700 underline text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeatureCollection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
