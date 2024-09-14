import React from 'react';
import SearchBar from '../components/SearchBar';
import '../App.css'; 

const HomePage = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to Our Country Search</h1>
        <p>Find countries and their capitals instantly.</p>
      </header>

      <section className="hero">
        <h2>Search for Countries and Capitals</h2>

        <div className="search-section">
          <SearchBar />
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Our Country Search. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
