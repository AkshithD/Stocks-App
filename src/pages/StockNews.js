import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const StockNewsPage = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch stock news using the API
    fetch('http://127.0.0.1:5000/api/mboum/news')
      .then(response => response.json())
      .then(data => {
        // Set the news data
        setNewsData(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-green-500 mb-4">Stock News</h2>
            <div className="grid gap-4">
            {newsData.map((newsItem, index) => (
                <div className="bg-white rounded p-4" key={index}>
                <h3 className="text-xl font-bold mb-2">{newsItem.title}</h3>
                <p className="mb-2">{newsItem.pubDate}</p>  
                <p className="mb-2">{newsItem.source}</p>
                <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="text-green-500">Read More</a>
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};

export default StockNewsPage;
