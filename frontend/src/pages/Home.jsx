import React from 'react';
import Hero from '../components/Layout/Hero.jsx';
import GenderCollection from '../components/Product/GenderCollection.jsx';
import NewArrivals from '../components/Product/NewArrivals.jsx';
import ProductDetail from '../components/Product/ProductDetail.jsx';
import ProductGrid from '../components/Product/ProductGrid.jsx';
import FeatureCollection from '../components/Product/FeatureCollection.jsx';
import FeaturedSection from '../components/Product/FeaturedSection.jsx';
const placeholderProducts = [
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
const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <h2 className="text-center text-3xl font-bold mb-4 text-purple-400">
        Best Seller
      </h2>
      <ProductDetail />
      <div className="container mx-auto">
        <h2 className="text-purple-700 underline text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeatureCollection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
