import React, { useState, useEffect } from 'react';
import StockCard from '../components/Stock_card';
import Navbar from '../components/Navbar';

const StocksPage = () => {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 100;
  const pagesToShow = 7;

  useEffect(() => {
    // Fetch stock data from the API
    fetch('http://127.0.0.1:5000/api/twelve')
      .then(response => response.json())
      .then(data => {
        data = data.data;
        setStocks(data);
      })
      .catch(error => console.log(error));
  }, []);

  // Calculate the total number of pages based on the available stocks
  const totalPages = Math.ceil(stocks.length / stocksPerPage);

  // Handle pagination
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index range for the current page
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  const addToPortfolio = async (stock) => {
    try {
      console.log('Adding stock to portfolio:', stock);
      // Make the API request to add the stock to the portfolio
      const email = localStorage.getItem('email');
      const response = await fetch(`http://127.0.0.1:5000/users/${email}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stock)
      });
      if (response) {
        console.log(response);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log('Error adding stock to portfolio:', error);
      // Add your logic here for handling the error in adding the stock to the portfolio
    }
  };

  const addToWatchlist = async (stock) => {
    try {
      console.log('Adding stock to watchlist:', stock);
      // Make the API request to add the stock to the watchlist
      const email = localStorage.getItem('email');
      const response = await fetch(`http://127.0.0.1:5000/users/${email}/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stock)
      });
      if (response) {
        console.log(response);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log('Error adding stock to watchlist:', error);
      // Add your logic here for handling the error in adding the stock to the watchlist
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-gray-800">
  <Navbar />
  <div className="flex justify-center mt-8">
  <div className="container mx-auto">
      <div className="stock-cards grid grid-cols-2 gap-4">
        {currentStocks.map((stock) => (
          <div key={stock.symbol} className="bg-creamwhite rounded-lg p-4 flex flex-col justify-between">
            <div className="flex-grow">
              <StockCard stock={stock} />
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={() => addToPortfolio(stock)}
              >
                Add to Portfolio
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg ml-4"
                onClick={() => addToWatchlist(stock)}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: pagesToShow }, (_, index) => currentPage - Math.floor(pagesToShow / 2) + index)
          .filter((page) => page > 0 && page <= totalPages)
          .map((page) => (
            <button
              key={page}
              className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mx-2 ${
                page === currentPage ? 'bg-green-600' : ''
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg ml-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>


  );
};

export default StocksPage;
