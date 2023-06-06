import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Stocks from './pages/Stocks';
import StockPage from './pages/StockPage';
import StockNews from './pages/StockNews';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Account from './pages/Account';
import Portfolio from './pages/Portfolio';
import WatchlistPage from './pages/Watchlist';
import PopularPage from './pages/Popular';

function App() {
    const hasAccount = localStorage.getItem('hasAccount') === 'true';
    console.log('hasAccount:', hasAccount);

  return (
    <div>
      <Router>
        <Routes>
        <Route exact path="/" element={hasAccount ? <Home /> : <LandingPage />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/stocks/:symbol" element={<StockPage />} />
          <Route path="/stock-news" element={<StockNews />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/popular" element={<PopularPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
