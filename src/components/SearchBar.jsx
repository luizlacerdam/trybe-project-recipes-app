import PropTypes from 'prop-types';
import React from 'react';

function SearchBar(props) {
  const { handleSearch, search } = props;
  return (
    <div>
      <input
        data-testid="search-input"
        value={ search }
        onChange={ handleSearch }
        type="text"
      />
      <label htmlFor="ingredient">
        <input data-testid="ingredient-search-radio" type="radio" id="ingredient" />
        Ingredient
      </label>
      <label htmlFor="name">
        <input data-testid="name-search-radio" type="radio" id="name" />
        Name
      </label>
      <label htmlFor="first-letter">
        <input data-testid="first-letter-search-radio" type="radio" id="first-letter" />
        First Letter
      </label>
      <button data-testid="exec-search-btn" type="button">Search</button>
    </div>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchBar;
