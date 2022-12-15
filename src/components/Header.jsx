import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/headerLogo.png';
import style from '../style/Meals.module.css';
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
    <div className={ style.header }>
      <div className={ style.up_header }>
        <div className={ style.header_button }>
          <img
            className={ style.header_icon }
            src={ logo }
            alt="header-logo"
          />
          <h1 className={ style.app_name }>Recipes app</h1>
        </div>
        <div className={ style.header_buttons }>
          {!searchButton ? '' : (
            <button
              className={ style.header_button }
              onClick={ isSeaching }
              type="button"
            >
              <FontAwesomeIcon
                className={ style.header_button_icon }
                icon={ solid('magnifying-glass') }
                size="3x"
              />
            </button>
          )}
          <button className={ style.header_button } onClick={ handleClick } type="button">
            <FontAwesomeIcon
              className={ style.header_button_icon }
              icon={ solid('user') }
              size="3x"
            />
          </button>
        </div>
      </div>
      <div className={ style.title_search }>
        <h1 className={ style.page_title } data-testid="page-title">{title}</h1>
        {!searching ? '' : (
          <SearchBar />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  searchButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
