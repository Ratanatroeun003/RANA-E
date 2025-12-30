import React from 'react';
import hero from '../../assets/hero.png';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section className="relative">
      <img
        src={hero}
        alt="heropic"
        className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover"
      />
      <div className="absolute flex items-center justify-center bg-black bg-opacity-5 inset-0 ">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter upercase ">
            Vaction <br /> Ready
          </h1>
          <p>explore our vaction-ready outfits with fast worldwide shipping.</p>
          <Link
            to={'#'}
            className="bg-white text-black px-4 py-2 mt-4 inline-block font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
