import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/signup');
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Stock Sensei</h1>
          <p className="home-description text-lg text-gray-600 text-center mb-8">
            A powerful platform to track and manage your favorite stocks.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
              onClick={handleStart}
            >
              Get Started
            </button>
          </div>
          <div className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="user-feature-section bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Real-Time Stock Data</h2>
              <p className="text-gray-600">
                Access up-to-date stock information with real-time data feeds from major stock exchanges. Stay informed
                about stock prices, volume, market trends, and more.
              </p>
            </div>
            <div className="user-feature-section bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Stock Tracking</h2>
              <p className="text-gray-600">
                Track the performance of your favorite stocks. Analyze gains and losses for the stocks using graph data.
              </p>
            </div>
            <div className="user-feature-section bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Personalized Watchlists</h2>
              <p className="text-gray-600">
                Create custom watchlists to monitor specific stocks or sectors of interest. Organize your investments
                and keep track of multiple stocks in a convenient and personalized way.
              </p>
            </div>
            <div className="user-feature-section bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Portfolio Management</h2>
              <p className="text-gray-600">
                Manage your investment portfolio and track your overall performance. Monitor your portfolio's value,
                analyze gains and losses, and make informed decisions to achieve your financial goals.
              </p>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
