import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
const selectedProduct = {
  name: 'Stylish Jacket',
  price: '$99.99',
  originalPrice: '$149.99',
  description: 'This is a stylish jacket perfect for any occation.',
  sizes: ['S', 'M', 'L', 'XL'],
  brand: 'Addidas',
  material: '100% Cotton',
  colors: ['Red', 'Blue'],
  images: [
    {
      url: 'https://picsum.photos/500/500?random=1',
      alt: 'Stylish Jacket 1',
    },
    {
      url: 'https://picsum.photos/500/500?random=2',
      alt: 'Stylish Jacket 2',
    },
  ],
};
const similarProducts = [
  {
    _id: 1,
    name: 'Product name1',
    price: 100,
    image: [
      {
        url: 'https://picsum.photos/500/500?random=3',
      },
    ],
  },
  {
    _id: 2,
    name: 'Product name2',
    price: 120,
    image: [
      {
        url: 'https://picsum.photos/500/500?random=4',
      },
    ],
  },
  {
    _id: 3,
    name: 'Product name3',
    price: 130,
    image: [
      {
        url: 'https://picsum.photos/500/500?random=5',
      },
    ],
  },
  {
    _id: 4,
    name: 'Product name3',
    price: 140,
    image: [
      {
        url: 'https://picsum.photos/500/500?random=6',
      },
    ],
  },
];
const ProductDetail = () => {
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isBottonDisabled, setIsBottonDisabled] = useState(false);
  const handleQuantityChange = (action) => {
    if (action === 'plus') {
      setQuantity((prev) => prev + 1);
    }
    if (action === 'minus' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  useEffect(() => {
    if (selectedProduct.images.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return toast.error(
        'Please select size and color before adding to cart.',
        { duration: 1000 }
      );
    }
    setIsBottonDisabled(true);
    setTimeout(() => {
      toast.success('Succesfully add to cart.', { duration: 1000 });
      setIsBottonDisabled(false);
    }, 500);
  };
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* lefthumbnailt side */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                src={image.url}
                alt={image.alt || `Thumbnail${index}`}
                key={index}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* main image */}
          <div className="md:w-1/2 ">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="mainimage"
                className="w-full object-cover rounded-lg"
              />
            </div>
          </div>
          {/* mobile thumbnails */}
          <div className="md:hidden overflow-x-scroll flex space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                src={image.url}
                alt={image.alt || `Thumbnail${index}`}
                key={index}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* leftside */}
          <div className="w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="line-through text-gray-400">
              {selectedProduct.originalPrice &&
                `${selectedProduct.originalPrice}`}
            </p>
            <p className="text-xl text-gray-600 mb-2">
              {selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-600">Color</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full size-8 border ${
                      selectedColor === color
                        ? 'border-4 border-black'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: 'brightness(0.5)',
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4 ">
              <p className="text-gray-600">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded px-4 py-2 border ${
                      selectedSize === size ? 'bg-black text-white' : ''
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange('minus')}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('plus')}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isBottonDisabled}
              className={`rounded bg-black py-2 px-6 text-white font-bold w-full mb-4 ${
                isBottonDisabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'bg-gray-900'
              }`}
            >
              {isBottonDisabled ? 'Adding...' : 'ADD TO CART '}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-5">Characteristics:</h3>
              <table className="text-left text-gray-600 w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
