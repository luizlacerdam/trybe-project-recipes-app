import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ recipeProp }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [favorites, setFavorites] = useState(false);
  const isPageMeal = pathname.includes('meals');
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const isFavorite = () => {
    const isFavorited = favoriteRecipes.some((recipe) => recipe.id === recipeProp.idMeal
    || recipe.id === recipeProp.idDrink);
    setFavorites(isFavorited);
  };

  useEffect(() => {
    isFavorite();
  });

  const handleButton = () => {
    if (favoriteRecipes.some((recipe) => recipe.id === recipeProp.idMeal
    || recipe.id === recipeProp.idDrink)) {
      let newArray;
      if (isPageMeal) {
        newArray = favoriteRecipes.filter((elem) => elem.id !== recipeProp.idMeal);
      } else {
        newArray = favoriteRecipes.filter((elem) => elem.id !== recipeProp.idDrink);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setFavorites(false);
    } else {
      let newObj;
      if (isPageMeal) {
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
      favoriteRecipes.push(newObj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      isFavorite();
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleButton }
      src={ favorites ? blackHeartIcon : whiteHeartIcon }
    >
      <img src={ favorites ? blackHeartIcon : whiteHeartIcon } alt="favorite-icon" />
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
