import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipesCard({ recipe, index, page }) {
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
    <Link
      to={ `${page}/${recipe[idVerify()]}` }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[imgThumbVerify()] }
          alt={ recipe[nameStrVerify()] }
          className="recipe-image"
        />
        <div
          data-testid={ `${index}-card-name` }
        >
          {recipe[nameStrVerify()]}

        </div>
      </div>
    </Link>
  );
}

RecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
  recipe: PropTypes.shape({}).isRequired,
};

export default RecipesCard;
