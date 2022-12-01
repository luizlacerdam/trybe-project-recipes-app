import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRecipeDetailsDrinks, fetchRecipeDetailsMeals } from '../redux/actions';

function RecipeDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const mealsId = useParams('/meals/:id');
  const { id } = mealsId;

  useEffect(() => {
    const { location: { pathname } } = history;

    if (pathname === `/meals/${id}`) {
      dispatch(fetchRecipeDetailsMeals(id));
    } else if (pathname === `/drinks/${id}`) {
      dispatch(fetchRecipeDetailsDrinks(id));
    }
  }, []);

  return (
    <div>
      <h1>Recipes Details</h1>
    </div>
  );
}

export default RecipeDetails;
