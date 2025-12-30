import React from 'react';
import { Link } from 'react-router-dom';
import feature from '../../assets/feature.png';
const FeatureCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="flex container mx-auto items-center flex-col-reverse lg:flex-row bg-green-50 rounded-3xl">
        {/* leftcontent */}
        <div className="text-center lg:text-left lg:w-1/2 p-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your everyday life{' '}
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Discover hight-quality, Comfortable clothing that effortlessly
            blends fashion and function. Designed to make you look and great
            everyday.
          </p>
          <Link
            to={'/collection/all'}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        {/* rightcontent */}

        <div className="lg:w-1/2 ">
          <img
            src={feature}
            alt="FeaturedCollection"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureCollection;
