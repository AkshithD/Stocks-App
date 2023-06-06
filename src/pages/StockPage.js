import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StockPage.css';
import Navbar from '../components/Navbar';

const StockGraph = ({ symbol }) => {
  const [graphUrl, setGraphUrl] = useState(null);

  useEffect(() => {
    // Fetch the graph URL using the symbol from the API
    fetch(`http://127.0.0.1:5000/api/twelve/graph/${symbol}`)
      .then(response => response.blob()) // Get the response as a Blob
      .then(data => {
        // Create an object URL from the Blob
        const imageUrl = URL.createObjectURL(data);
        setGraphUrl(imageUrl);
      })
      .catch(error => console.log(error));
  }, [symbol]);

  if (!graphUrl) {
    return <div>Loading graph...</div>;
  }

  return (
    <div>
      <h3 className="text-2xl mb-4">Stock Graph</h3>
      <img src={graphUrl} alt="Stock Graph" />
    </div>
  );
};

const StockPage = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Fetch stock details using the symbol from the API
    fetch(`http://127.0.0.1:5000/api/mboum/${symbol}`)
      .then(response => response.json())
      .then(data => {
        data = data.optionChain.result[0];
        setStockData(data);
      })
      .catch(error => console.log(error));
  }, [symbol]);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-green">
  <Navbar />
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-green-500 mb-4">Stock Details</h1>
    <div className="bg-white rounded p-4">
      <h2 className="text-2xl font-bold mb-2">{stockData.quote.longName}</h2>
      <p className="mb-2">Symbol: {stockData.underlyingSymbol}</p>
      <p className="mb-2">Price: {stockData.quote.postMarketPrice}</p>
      <p className="mb-2">Change: {stockData.quote.postMarketChange}</p>
      <p className="mb-2">Change in percent: {stockData.quote.postMarketChangePercent}</p>
      <p className="mb-2">Previous close: {stockData.quote.regularMarketPreviousClose}</p>
      <p className="mb-2">Open: {stockData.quote.regularMarketOpen}</p>
      <p className="mb-2">Day low: {stockData.quote.regularMarketDayLow}</p>
      <p className="mb-2">Day high: {stockData.quote.regularMarketDayHigh}</p>
      <p className="mb-2">Volume: {stockData.quote.regularMarketVolume}</p>
      <p className="mb-2">Average volume: {stockData.quote.averageDailyVolume3Month}</p>
      <p className="mb-2">Market cap: {stockData.quote.marketCap}</p>
      <p className="mb-2">50 day moving average: {stockData.quote.fiftyDayAverage}</p>
      <p className="mb-2">200 day moving average: {stockData.quote.twoHundredDayAverage}</p>
      <div className="mt-4">
        <StockGraph symbol={symbol} />
      </div>
    </div>
  </div>
</div>

  );
};

export default StockPage;
