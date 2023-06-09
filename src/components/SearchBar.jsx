import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  cleanDrinksError, cleanMealsError, fetchDrinks, fetchMeals,
} from '../redux/actions';
import style from '../style/Meals.module.css';

function SearchBar() {
  const meals = useSelector((state) => state.meals.meals);
  const drinks = useSelector((state) => state.drinks.drinks);
  const errorMeals = useSelector((state) => state.meals.error);
  const errorDrinks = useSelector((state) => state.drinks.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiRequest, setApiRequest] = useState(
    { radio: 'i', filter: 'filter', search: '' },
  );
  const [searched, setSearched] = useState(false);

  const verifyPage = () => {
    const { location: { pathname } } = history;
    const { radio, search, filter } = apiRequest;

    if (pathname === '/meals') {
      dispatch(fetchMeals(radio, search, filter));
    } else {
      dispatch(fetchDrinks(radio, search, filter));
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

  useEffect(() => {
    const didReturn = async () => {
      console.log(errorDrinks);
      console.log(errorMeals);
      if (searched && (errorDrinks === 'error' || errorMeals === 'error')) {
        setSearched(false);
        await dispatch(cleanDrinksError);
        await dispatch(cleanMealsError);
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    didReturn();
  }, [errorDrinks, errorMeals]);

  const doSearch = () => {
    const { radio, search } = apiRequest;
    setSearched(true);
    if (radio === 'f' && search.length !== 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    verifyPage();
  };

  return (
    <div className={ style.search_bar }>
      <input
        placeholder="Search"
        data-testid="search-input"
        onChange={
          ({ target: { value } }) => { setApiRequest({ ...apiRequest, search: value }); }
        }
        value={ apiRequest.search }
        type="text"
        className={ style.search_input }
      />
      <div className={ style.search_type }>
        <label htmlFor="ingredient">
          <input
            className={ style.search_radio }
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
            className={ style.search_radio }
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
            className={ style.search_radio }
            value="f"
            name="radio"
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            onClick={ handleRadio }
          />
          First Letter
        </label>
      </div>
      <button
        onClick={ doSearch }
        data-testid="exec-search-btn"
        type="button"
        className={ style.search_button }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
