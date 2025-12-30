import { useEffect, useRef, useState, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  // Removed the unused `scrollLeft` state
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const Newarrivals = [
    // ... (Your product data remains the same)
    {
      _id: 1,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=1',
          altText: 'Stylish jacket front view',
        },
      ],
    },
    {
      _id: 2,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=2',
          altText: 'Stylish jacket front view',
        },
      ],
    },
    {
      _id: 3,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=3',
          altText: 'Stylish jacket front view',
        },
      ],
    },
    {
      _id: 4,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=4',
          altText: 'Stylish jacket front view',
        },
      ],
    },
    {
      _id: 5,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=5',
          altText: 'Stylish jacket front view',
        },
      ],
    },
    {
      _id: 6,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=6',
          altText: 'Stylish jacket front view',
        },
      ],
    },
    {
      _id: 7,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=7',
          altText: 'Stylish jacket front view',
        },
      ],
    },
    {
      _id: 8,
      name: 'Stylish jacket',
      price: 59.99,
      images: [
        {
          url: 'https://picsum.photos/500?/500/random=8',
          altText: 'Stylish jacket front view',
        },
      ],
    },
  ];

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Use useCallback to prevent unnecessary re-creation and ensure correct dependencies
  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Correct check for the left boundary
    const atLeft = container.scrollLeft <= 5;

    // 🔥 CORRECT CHECK for the right boundary:
    // We are at the end when the sum of current scroll position and visible width
    // equals the total scrollable width (with a small tolerance for fractional pixels)
    const atRight =
      Math.ceil(container.scrollLeft + container.clientWidth) >=
      container.scrollWidth - 5;

    setCanScrollLeft(!atLeft);
    setCanScrollRight(!atRight);

    /*
        console.log({
             scrollLeft: container.scrollLeft,
             clientWidth: container.clientWidth,
             scrollWidth: container.scrollWidth,
             atRight: atRight 
        });
        */
  }, []);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initial check to set button state when component mounts
    updateScrollButtons();

    container.addEventListener('scroll', updateScrollButtons);

    // 🔥 Add a listener for window resize, as this changes clientWidth/scrollWidth
    window.addEventListener('resize', updateScrollButtons);

    // Cleanup function for useEffect
    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]); // Depend on updateScrollButtons

  return (
    <section className="py-10">
      <div className="container mx-auto text-center mb-10 relative px-4">
        <h2 className="text-3xl font-bold mb-4 bg-fuchsia-700 text-white py-2 rounded">
          Explore New Arrivals 🚀
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Button Container */}
        <div className="absolute right-4 md:right-0 bottom-[-40px] flex space-x-2 z-10">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded border transition duration-200 ${
              canScrollLeft
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded border transition duration-200 ${
              canScrollRight
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* content section */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="mx-auto overflow-x-scroll flex space-x-6 relative py-2 px-4 sm:px-8"
      >
        {Newarrivals.map((items) => (
          <div
            key={items._id}
            className="min-w-[80%] sm:min-w-[40%] lg:min-w-[25%] xl:min-w-[20%] relative snap-start"
          >
            <Link to={`/product/${items._id}`} className="block">
              <img
                src={items.images[0].url}
                alt={items.images[0].altText || items.name}
                className="w-full h-[500px] object-cover rounded-lg shadow-md relative"
              />
              <div className="mt-2 text-left absolute bottom-0 bg-gray-400 rounded-t-sm bg-opacity-60 p-2 w-full">
                <h3 className="font-semibold text-gray-800 truncate">
                  {items.name}
                </h3>
                <p className="text-lg font-bold text-fuchsia-700">
                  ${items.price.toFixed(2)}
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
