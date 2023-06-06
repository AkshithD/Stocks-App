import React, { useState, useEffect } from 'react';
import StockCard from '../components/Stock_card';
import Navbar from '../components/Navbar';


const PopularPage = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/popular_stocks`);
        const data = await response.json();
        const stockss = data.stocks
        setStocks(stockss);
      } catch (error) {
        console.log('Error fetching user stocks:', error);
      }
    };

    // Fetch user's stocks when the component mounts
    fetchUserStocks();
  }, []);

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


  return (
    <div className="bg-gray-800 min-h-screen">
  <Navbar />
  <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold text-white mb-4">Popular Stocks</h1>
    <div className="stock-cards grid grid-cols-2 gap-4">
      {stocks.length > 0 ? (
        stocks.map((stock) => (
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
        ))
      ) : (
        <p className="text-white">No stocks in section</p>
      )}
    </div>
  </div>
</div>

  );
};

export default PopularPage;
