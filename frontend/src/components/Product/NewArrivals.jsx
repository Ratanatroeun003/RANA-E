import axios from 'axios';
import { useEffect, useRef, useState, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftAtStart, setScrollLeftAtStart] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`,
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchNewArrivals();
  }, []);

  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const atLeft = container.scrollLeft <= 5;
    const atRight =
      Math.ceil(container.scrollLeft + container.clientWidth) >=
      container.scrollWidth - 5;
    setCanScrollLeft(!atLeft);
    setCanScrollRight(!atRight);
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftAtStart(scrollRef.current.scrollLeft);
  };

  const stopDragging = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftAtStart - walk;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [newArrivals, updateScrollButtons]);

  return (
    <section className="py-10">
      <div className="container mx-auto text-center mb-10 relative px-4">
        <h2 className="text-3xl font-bold mb-4 bg-fuchsia-700 text-white py-2 rounded">
          Explore New Arrivals 🚀
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Discover the latest styles straight off the runway.
        </p>

        <div className="absolute right-4 md:right-0 bottom-[-40px] flex space-x-2 z-10">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded border transition ${canScrollLeft ? 'bg-white hover:bg-gray-100' : 'bg-gray-200 text-gray-500'}`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded border transition ${canScrollRight ? 'bg-white hover:bg-gray-100' : 'bg-gray-200 text-gray-500'}`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={handleMouseMove}
        className="mx-auto overflow-x-auto flex space-x-6 relative py-2 px-4 sm:px-8 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {newArrivals.map((item) => (
          <div
            key={item._id}
            className="min-w-[80%] sm:min-w-[40%] lg:min-w-[25%] xl:min-w-[20%] relative snap-start"
          >
            <Link to={`/product/${item._id}`} className="block">
              <img
                src={item.images?.[0]?.url || 'https://via.placeholder.com/500'}
                alt={item.name}
                className="w-full h-[500px] object-cover rounded-lg shadow-md pointer-events-none"
              />
              <div className="mt-2 text-left absolute bottom-0 bg-gray-400 bg-opacity-60 p-2 w-full">
                <h3 className="font-semibold text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-lg font-bold text-fuchsia-700">
                  ${item.price?.toFixed(2)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
