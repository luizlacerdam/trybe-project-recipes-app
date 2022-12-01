import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDrinks, fetchMeals } from '../redux/actions';

function SearchBar() {
  const meals = useSelector((state) => state.meals.meals);
  const drinks = useSelector((state) => state.drinks.drinks);
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiRequest, setApiRequest] = useState(
    { radio: 'i', filter: 'filter', search: '' },
  );

  const verifyPage = async () => {
    const { location: { pathname } } = history;
    const { radio, search, filter } = apiRequest;

    if (pathname === '/meals') {
      await dispatch(fetchMeals(radio, search, filter));
    } else if (pathname === '/drinks') {
      await dispatch(fetchDrinks(radio, search, filter));
      console.log(drinks);
    }
  };

  useEffect(() => {
    const changePage = () => {
      const { location: { pathname } } = history;
      if (pathname === '/meals' && meals.length === 1) {
        const { idMeal } = meals[0];
        history.push(`/meals/${idMeal}`);
      } else if (pathname === '/drinks' && drinks.length === 1) {
        const { idDrink } = drinks[0];
        console.log(drinks);
        history.push(`/drinks/${idDrink}`);
      }
    };
    changePage();
  }, [meals, drinks, history]);

  const handleRadio = ({ target: { value } }) => {
    if (value === 'i') {
      setApiRequest({ radio: value, filter: 'filter' });
    } else {
      setApiRequest({ radio: value, filter: 'search' });
    }
  };

  const doSearch = async () => {
    const { radio, search } = apiRequest;
    if (radio === 'f' && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    await verifyPage();
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
