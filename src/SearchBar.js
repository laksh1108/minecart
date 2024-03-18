
import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={handleChange}
    onFocus={handleFocus}
    onBlur={handleBlur}
    className={isFocused ? 'focused' : ''}
    />
  );
};

export default SearchBar;