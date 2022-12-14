import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import style from '../style/RecipeDetails.module.css';

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
      className={ style.header_button }
    >
      { favorites ? (
        <FontAwesomeIcon
          className={ style.header_button_image }
          icon={ solid('heart') }
          size="3x"
        />)
        : (
          <FontAwesomeIcon
            className={ style.header_button_image }
            icon={ regular('heart') }
            size="3x"
          />)}
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
