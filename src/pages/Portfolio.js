import React, { useState, useEffect } from 'react';
import StockCard from '../components/Stock_card';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const PortfolioPage = () => {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 30;
  const hasAccount = localStorage.getItem('hasAccount') === 'true';

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        // Fetch user's stocks from the API based on their email
        const email = localStorage.getItem('email');
        if (email === null) {
            return;
          }
        const response = await fetch(`http://127.0.0.1:5000/users/${email}/portfolio`);
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.log('Error fetching user stocks:', error);
      }
    };

    // Fetch user's stocks when the component mounts
    fetchUserStocks();
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

  const deleteFromPortfolio = async (symbol) => {
    try {
      console.log('Deleting stock from portfolio:', symbol);
      // Make the API request to delete the stock from the portfolio
      const email = localStorage.getItem('email');
      const response = await fetch(`http://127.0.0.1:5000/users/${email}/portfolio/${symbol}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted stock from the local state
        setStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
        console.log('Stock deleted successfully');
      } else {
        console.log('Failed to delete stock from portfolio');
      }
    } catch (error) {
      console.log('Error deleting stock from portfolio:', error);
      // Add your logic here for handling the error in deleting the stock from the portfolio
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Portfolio</h1>
        {!hasAccount && (
          <div className="container mx-auto mt-8">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <p className="text-lg font-semibold mb-4">You don't have an account.</p>
              <p>
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>{' '}
                or{' '}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                  login
                </Link>{' '}
                to create an account.
              </p>
            </div>
          </div>
        )}
        <div className="stock-cards grid grid-cols-2 gap-4">
          {currentStocks.length > 0 ? (
            currentStocks.map((stock) => (
              <div key={stock.symbol} className="bg-creamwhite rounded-lg p-4 flex flex-col justify-between">
                <div className="flex-grow">
                  <StockCard stock={stock} />
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => deleteFromPortfolio(stock.symbol)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No stocks in portfolio</p>
          )}
        </div>
        <div className="pagination mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
