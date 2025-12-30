import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSideBar = () => {
  const [searchParams, setSearchparams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilter] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ['Top Wear', 'Bottom Wear'];
  const colors = [
    'Red',
    'Green',
    'Blue',
    'Black',
    'Yellow',
    'Gray',
    'White',
    'Pink',
    'Beige',
    'Navy',
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const materials = [
    'Cotton',
    'Wool',
    'Demin',
    'Polyester',
    'Silk',
    'Linen',
    'Viscose',
    'Fleece',
  ];
  const brands = [
    'Urban Threads',
    'Modern Fit',
    'Street Style',
    'Beach Brezze',
    'Fashionsta',
    'ChicStyle',
  ];
  const genders = ['Men', 'Women'];
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };
    if (type === 'checkbox') {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilter(newFilters);
    updateUrlParams(newFilters);
  };
  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(','));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchparams(params);
    navigate(`?${params.toString()}`); // ?category=bottom&size=xs
  };
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilter(filters);
    updateUrlParams(newFilters);
  };
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filters</h3>
      {/* categoryfilter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 ">
          Category
        </label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              value={category}
              onChange={handleFilterChange}
              name="category"
              checked={filters.category === category}
              className="mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* gerderfilter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 ">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              value={gender}
              onChange={handleFilterChange}
              name="gender"
              checked={filters.gender === gender}
              className="mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span>{gender}</span>
          </div>
        ))}
      </div>
      {/* color filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 ">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={
                'size-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500":""}'
              }
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
      {/* Size filter */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600 font-medium">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={size}
              onChange={handleFilterChange}
              name="size"
              checked={filters.size.includes(size)}
              className="mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300 "
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/* Material filter */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600 font-medium">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300 "
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>
      {/* Size filter */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-600 font-medium">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300 "
            />
            <span className="text-gray-700 text-sm">{brand}</span>
          </div>
        ))}
      </div>
      {/* priceRank filter */}
      <div className="mb-8">
        <label className="block text-gray-600 mb-2 font-medium">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          value={priceRange[1]}
          onChange={handlePriceChange}
          max={100}
          className="w-full h-2 rounded-lg bg-gray-300 appearance-none cursor-pointer "
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>0</span>
          <span>{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
