import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipesCard({ recipe, index, page }) {
  const imgThumbVerify = () => {
    let imgThumb;
    if (page === '/meals') {
      imgThumb = 'strMealThumb';
    } else
    if (page === '/drinks') {
      imgThumb = 'strDrinkThumb';
    }
    return imgThumb;
  };

  const nameStrVerify = () => {
    let nameStr;
    if (page === '/meals') {
      nameStr = 'strMeal';
    } else
    if (page === '/drinks') {
      nameStr = 'strDrink';
    }
    return nameStr;
  };

  const idVerify = () => {
    let id;
    if (page === '/meals') {
      id = 'idMeal';
    } else
    if (page === '/drinks') {
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
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[imgThumbVerify()] }
          alt=""
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
