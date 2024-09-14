import React, { useState, useCallback } from 'react';
import { fetchCountries } from '../services/api'; 
import _ from 'lodash'; 
import './SearchBar.css'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const fetchSuggestions = useCallback(
    _.debounce(async (query) => {
      try {
        const data = await fetchCountries();
        if (Array.isArray(data)) {
          const filtered = data.filter(
            item => item.country.toLowerCase().includes(query.toLowerCase()) || 
                    item.capital?.toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filtered);
        } else {
          console.error('Data is not an array:', data);
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        setSuggestions([]);
      }
    }, 300), 
    []
  );

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery.length > 2) {
      fetchSuggestions(newQuery);
      setShowResults(true);
    } else {
      setSuggestions([]);
      setShowResults(false);
    }
  };

  const handleSearch = () => {
    if (query.length > 2) {
      fetchSuggestions(query);
      setShowResults(true);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for countries or capitals"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      {showResults && suggestions.length > 0 && (
        <div className="search-results">
          <h2>Search Results:</h2>
          <ul>
            {suggestions.map((item, index) => (
              <li key={index} className="search-result-item">
                <strong>{item.country}</strong> - {item.capital}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showResults && suggestions.length === 0 && (
        <div className="no-results">
          <p>No results found.</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
