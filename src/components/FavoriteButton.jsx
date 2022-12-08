import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ recipeProp }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [favoritesMeals, setFavoriteMeals] = useState([]);
  const [favoritesDrinks, setFavoriteDrinks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', '[]');
    } else {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(favoriteRecipes);
    }
  }, []);
  const handleButton = () => {
    const arr = JSON.parse(localStorage.favoriteRecipes);
    let newObj;
    if (pathname.includes('meals')) {
      newObj = {
        id: recipeProp.idMeal,
        type: 'meal',
        nationality: recipeProp.strArea,
        category: recipeProp.strCategory,
        alcoholicOrNot: '',
        name: recipeProp.strMeal,
        image: recipeProp.strMealThumb,
      };
    } else {
      newObj = {
        id: recipeProp.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeProp.strCategory,
        alcoholicOrNot: recipeProp.strAlcoholic,
        name: recipeProp.strDrink,
        image: recipeProp.strDrinkThumb,
      };
    }
    arr.push(newObj);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
  };
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleButton }
    >
      <img src={ whiteHeartIcon } alt="" />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipeProp: PropTypes.shape(),
};
FavoriteButton.defaultProps = {
  recipeProp: {},
};

export default FavoriteButton;
