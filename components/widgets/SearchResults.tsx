import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import Calculator from './Calculator';
import PeopleAlsoAsk from './PeopleAlsoAsk';

const SearchResults: React.FC = () => {
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setHasSearched(true);
    // Here you would typically make an API call for search results
    console.log('Searching for:', query);
  };

  return (
    <div className="search-page">
      <SearchBar onSearch={handleSearch} />
      {hasSearched && (
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
