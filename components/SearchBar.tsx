import React, { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const mockSuggestions = [
  'react tutorial',
  'react native',
  'react hooks',
  'react router',
  'react redux',
  'typescript tutorial',
  'typescript vs javascript',
  'typescript react'
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getSuggestions = useCallback(async (value: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSuggestions.filter(s => 
      s.toLowerCase().includes(value.toLowerCase())
    );
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 1) {
        const results = await getSuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, getSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      setQuery(selected);
      onSearch(selected);
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Google"
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
