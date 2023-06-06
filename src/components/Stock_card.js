import React from 'react';
import { Link } from 'react-router-dom';

const StockCard = ({ stock }) => {
  return (
    <div className="bg-white p-4 rounded-lg h-full">
      <h2 className="text-lg font-semibold mb-2">{stock.symbol}</h2>
      <p className="text-gray-600">{stock.name}</p>
      <p className="text-gray-600">Exchange: {stock.exchange}</p>
      <p className="text-gray-600">Type: {stock.type}</p>
      <Link
        to={`/stocks/${stock.symbol}`}
        className="text-green-500 hover:text-green-600 font-medium mt-2"
      >
        View Details
      </Link>
    </div>
  );
};

export default StockCard;
