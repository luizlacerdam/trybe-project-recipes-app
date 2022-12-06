import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function InProgressCard() {
  // const currentRecipe = useSelector((state) => state.inProgress.current);
  const currentRecipe = { strDrink: 'Aquamarine',
    strCategory: 'Cocktail',
    strInstructions: 'Shake well in a shaker with ice. Strain in a martini glass.',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg' };
  const [page, setPage] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;
  useEffect(() => {
    if (pathname.includes('/meals')) setPage('Meal');
    if (pathname.includes('/drinks')) setPage('Drink');
    console.log('test');
  });
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ currentRecipe[`str${page}Thumb`] }
        alt="Thumb"
      />
      <h1 data-testid="recipe-title">{currentRecipe[`str${page}`]}</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <h2 data-testid="recipe-category">{currentRecipe.strCategory}</h2>
      <p data-testid="instructions">{currentRecipe.strInstructions}</p>
      <button data-testid="finish-recipe-btn" type="button">Done</button>
    </div>
  );
}

export default InProgressCard;
