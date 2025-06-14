import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import Calculator from './Calculator';
import PeopleAlsoAsk from './PeopleAlsoAsk';

const SearchResults: React.FC = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasSearched(true);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <SearchBar onSearch={handleSearch} />
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner" />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {hasSearched && !isLoading && (
        <div className="search-results">
          <div className="main-results">
            {/* Main search results would go here */}
            <p>Search results would appear here...</p>
          </div>
          <div className="widgets-container">
            <Calculator />
            <PeopleAlsoAsk />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
