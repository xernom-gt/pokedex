import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Cari pokemon..." 
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
