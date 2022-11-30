import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchMeals } from '../redux/actions';

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiRequest, setApiRequest] = useState({ radio: '', filter: '', search: '' });
  // const [searchInput, setSearchInput] = useState('');

  // const handleSearch = ({ target: { value } }) => {
  //   setSearchInput(value);
  // };

  const verifyPage = () => {
    const { location: { pathname } } = history;
    const { radio, search, filter } = apiRequest;
    console.log(pathname);

    if (pathname === '/meals') {
      console.log('Pagina de comida');
      dispatch(fetchMeals(radio, search, filter));
    } else if (pathname === '/drinks') {
      console.log('Pagina de bebida');
    }
  };

  const handleRadio = ({ target: { value } }) => {
    if (value === 'i') {
      setApiRequest({ radio: value, filter: 'filter' });
    } else {
      setApiRequest({ radio: value, filter: 'search' });
    }
  };

  const doSearch = () => {
    const { radio, search } = apiRequest;
    if (radio === 'f' && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    verifyPage();
  };

  return (
    <div>
      <input
        data-testid="search-input"
        onChange={
          ({ target: { value } }) => { setApiRequest({ ...apiRequest, search: value }); }
        }
        value={ apiRequest.search }
        type="text"
      />
      <label htmlFor="ingredient">
        <input
          value="i"
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
          onClick={ handleRadio }
          name="radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          value="s"
          onClick={ handleRadio }
          name="radio"
          data-testid="name-search-radio"
          type="radio"
          id="name"
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          value="f"
          name="radio"
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter"
          onClick={ handleRadio }
        />
        First Letter
      </label>
      <button
        onClick={ doSearch }
        data-testid="exec-search-btn"
        type="button"
      >
        Search

      </button>
    </div>
  );
}

export default SearchBar;
