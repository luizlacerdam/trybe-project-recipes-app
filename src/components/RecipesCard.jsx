import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import style from '../style/Meals.module.css';

function RecipesCard({ recipe, index, page }) {
  const history = useHistory();
  const imgThumbVerify = () => {
    let imgThumb;
    if (page === '/meals') {
      imgThumb = 'strMealThumb';
    } else {
      imgThumb = 'strDrinkThumb';
    }
    return imgThumb;
  };

  const nameStrVerify = () => {
    let nameStr;
    if (page === '/meals') {
      nameStr = 'strMeal';
    } else {
      nameStr = 'strDrink';
    }
    return nameStr;
  };

  const idVerify = () => {
    let id;
    if (page === '/meals') {
      id = 'idMeal';
    } else {
      id = 'idDrink';
    }
    return id;
  };

  return (
    <button
      type="button"
      onClick={ () => history.push(`${page}/${recipe[idVerify()]}`) }
      className={ style.recipe_card }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className={ style.recipe_conteiner }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[imgThumbVerify()] }
          alt={ recipe[nameStrVerify()] }
          className={ style.recipe_image }
        />
        <h3
          data-testid={ `${index}-card-name` }
          className={ style.recipe_text }
        >
          {recipe[nameStrVerify()]}
        </h3>
      </div>
    </button>
  );
}

RecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
  recipe: PropTypes.shape({}).isRequired,
};

export default RecipesCard;
