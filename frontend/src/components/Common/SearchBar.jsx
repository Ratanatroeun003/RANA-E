import { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../../redux/slice/productSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? 'absolute top-0 left-0 bg-gray-300 h-24 z-50' : 'w-auto'
      }`}
    >
      {isOpen ? (
        <form
          className="flex items-center justify-center w-full"
          onSubmit={handleSearch}
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-200 py-2 px-4 rounded-md w-full focus:outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <HiMagnifyingGlass className="size-6" />
            </button>
          </div>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={handleSearchToggle}
          >
            {' '}
            <HiMiniXMark className="size-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          {' '}
          <HiMagnifyingGlass className="size-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
