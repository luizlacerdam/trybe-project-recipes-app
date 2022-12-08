import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function FavoriteButton({ recipeProp }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  const handleButton = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', '[]');
    }
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
  console.log(recipeProp);
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleButton }
    >
      FAVORITE
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
