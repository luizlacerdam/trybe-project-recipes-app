import PropTypes from 'prop-types';

function RecipesCard({ recipe, index, page }) {
  const imgThumbVerify = () => {
    let imgThumb;
    if (page === '/meals') {
      imgThumb = 'strMealThumb';
    } else
    if (page === 'drinks') {
      imgThumb = 'strDrinkThumb';
    }
    return imgThumb;
  };

  const nameStrVerify = () => {
    let nameStr;
    if (page === '/meals') {
      nameStr = 'strMeal';
    } else
    if (page === 'drinks') {
      nameStr = 'strDrink';
    }
    return nameStr;
  };

  return (
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
  );
}

RecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
  recipe: PropTypes.shape({}).isRequired,
};

export default RecipesCard;
