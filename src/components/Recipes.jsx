import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRecipeCategoriesDrinks, fetchRecipeCategoriesMeals,
  fetchRecipeMainDrinks,
  fetchRecipeMainMeals } from '../redux/actions';
import RecipesCard from './RecipesCard';

function Recipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;
  const FIVE = 5;
  const TWELVE = 12;

  const MEALS = useSelector((state) => state.meals.meals);
  const DRINKS = useSelector((state) => state.drinks.drinks);

  const MEALS_CATEGORIES = useSelector((state) => state.meals.categoriesRecipeMeals);
  const DRINKS_CATEGORIES = useSelector((state) => state.drinks.categoriesRecipeDrinks);

  useEffect(() => {
    if (pathname === '/meals') {
      dispatch(fetchRecipeMainMeals());
      dispatch(fetchRecipeCategoriesMeals());
    } else
    if (pathname === '/drinks') {
      dispatch(fetchRecipeMainDrinks());
      dispatch(fetchRecipeCategoriesDrinks());
    }
  }, []);

  const verifyPageRecipes = () => {
    let RECIPES;
    if (pathname === '/meals') {
      RECIPES = MEALS;
    } else
    if (pathname === '/drinks') {
      RECIPES = DRINKS;
    }
    return RECIPES;
  };

  const verifyPageCategories = () => {
    let CATEGORIES;
    if (pathname === '/meals') {
      CATEGORIES = MEALS_CATEGORIES;
    } else
    if (pathname === '/drinks') {
      CATEGORIES = DRINKS_CATEGORIES;
    }
    return CATEGORIES;
  };

  return (
    <main>
      {verifyPageCategories().map((category, index) => {
        if (index < FIVE) {
          return (
            <div
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}

            </div>
          );
        }
        return true;
      })}
      {verifyPageRecipes().map((recipe, index) => {
        if (index < TWELVE) {
          return (<RecipesCard
            key={ index }
            recipe={ recipe }
            index={ index }
            page={ pathname }
          />);
        }
        return true;
      })}
    </main>
  );
}

export default Recipes;
