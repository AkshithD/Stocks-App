import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);

    // Call your API with the keyword
    if (keyword) {
      setIsLoading(true);
      fetch(`http://127.0.0.1:5000/api/vantage/${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response
          data = data.data.bestMatches || []; // Array of objects
          setDropdownItems(data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setDropdownItems([]);
    }
  };

  return (
    <nav className="bg-gray-800 py-4">
      <ul className="flex justify-center space-x-10">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/stocks" className="text-white hover:text-gray-300">
            Stocks
          </Link>
        </li>
        <li>
          <Link to="/popular" className="text-white hover:text-gray-300">
            Popular Stocks
          </Link>
        </li>
        <li>
          <Link to="/portfolio" className="text-white hover:text-gray-300">
            Portfolio
          </Link>
        </li>
        <li>
          <Link to="/watchlist" className="text-white hover:text-gray-300">
            Watchlist
          </Link>
        </li>
        <li>
          <Link to="/stock-news" className="text-white hover:text-gray-300">
            Stock News
          </Link>
        </li>
        <li>
          <Link to="/account" className="text-white hover:text-gray-300">
            Account
          </Link>
        </li>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search Stock"
            className="px-2 py-1 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
          />
          {isLoading && (
            <ul className="absolute left-0 w-full bg-white border border-gray-300 py-2 px-4 mt-2">
              <li>Loading...</li>
            </ul>
          )}
          {searchTerm.length > 0 && dropdownItems.length > 0 && (
            <ul className="absolute left-0 w-full bg-white border border-gray-300 py-2 px-4 mt-2">
              {dropdownItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/stocks/${item['1. symbol']}`}
                    className="text-gray-800 hover:text-blue-500"
                  >
                    {item['2. name']}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
