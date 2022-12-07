import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function InProgressCard() {
  // const currentRecipe = useSelector((state) => state.inProgress.current);
  const currentRecipe = [{ strDrink: 'Aquamarine',
    strCategory: 'Cocktail',
    strInstructions: 'Shake well in a shaker with ice. Strain in a martini glass.',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    strIngredient1: 'Hpnotiq',
    strIngredient2: 'Pineapple Juice',
    strIngredient3: 'Banana Liqueur',
    strIngredient4: null,
    strIngredient5: null,
    strIngredient6: null,
    strIngredient7: null,
    strIngredient8: null,
    strIngredient9: null,
    strIngredient10: null,
    strIngredient11: null,
    strIngredient12: null,
    strIngredient13: null,
    strIngredient14: null,
    strIngredient15: null }];
  const getIngredients = () => {
    const result = currentRecipe.map((element) => Object.entries(element)
      .filter((elem) => elem[0].includes('strIngredient')
    && elem[1] !== ''
    && elem[1] !== ' '
    && elem[1] !== null)
      .map((ingredients) => ingredients[1])).flat();
    return result;
  };
  const ingredientList = getIngredients();
  const [page, setPage] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;
  useEffect(() => {
    if (pathname.includes('/meals')) setPage('Meal');
    if (pathname.includes('/drinks')) setPage('Drink');
  }, [pathname]);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ currentRecipe[0][`str${page}Thumb`] }
        alt="Thumb"
      />
      <h1 data-testid="recipe-title">{currentRecipe[0][`str${page}`]}</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <h2 data-testid="recipe-category">{currentRecipe[0].strCategory}</h2>
      <p data-testid="instructions">{currentRecipe[0].strInstructions}</p>
      <button data-testid="finish-recipe-btn" type="button">Done</button>
      <div>
        {ingredientList.map((ingredient, index) => (
          <label
            data-testid={ `${index}-ingredient-step` }
            key={ `ingredient-${index}` }
            htmlFor={ `ingredient-${index}` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              id={ `ingredient-${index}` }
            />
            { ingredient }
          </label>
        ))}
      </div>
    </div>
  );
}

export default InProgressCard;
