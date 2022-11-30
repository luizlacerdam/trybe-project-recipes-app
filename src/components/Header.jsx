import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, searchButton } = props;
  const history = useHistory();
  const [searching, setSearching] = useState(false);

  const handleClick = () => {
    history.push('/profile');
  };

  const isSeaching = () => {
    setSearching(!searching);
  };

  return (
    <div>
      <button onClick={ handleClick } type="button">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="SVG"
        />
      </button>
      <h1 data-testid="page-title">{title}</h1>
      {!searching ? '' : (
        <SearchBar />
      )}
      {!searchButton ? '' : (
        <button onClick={ isSeaching } type="button">
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="SVG"
          />
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  searchButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
