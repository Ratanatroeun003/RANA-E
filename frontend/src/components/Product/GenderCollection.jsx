import React from 'react';
import mencollection from '../../assets/mencollection.png';
import womencollection from '../../assets/womencollection.png';
import { Link } from 'react-router-dom';
const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1">
          <img
            src={mencollection}
            alt="mencollection"
            className="w-full h-[650] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-semibold text-gray">
              Men's collection
            </h2>
            <Link
              to={'/collections/all?gender=men'}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src={womencollection}
            alt="mencollection"
            className="w-full h-[650] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-semibold text-gray">
              Women's collection
            </h2>
            <Link
              to={'/collections/all?gender=women'}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
