import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCategoryDrinksFilter, fetchCategoryMealsFilter,
  fetchRecipeCategoriesDrinks, fetchRecipeCategoriesMeals,
  fetchRecipeMainDrinks,
  fetchRecipeMainMeals } from '../redux/actions';
import RecipesCard from './RecipesCard';

function Recipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [categoryToggle, setCategoryToggle] = useState('');
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
    } else {
      dispatch(fetchRecipeMainDrinks());
      dispatch(fetchRecipeCategoriesDrinks());
    }
  }, []);

  const verifyPageRecipes = () => {
    let RECIPES;
    if (pathname === '/meals') {
      RECIPES = MEALS;
    } else {
      RECIPES = DRINKS;
    }
    return RECIPES;
  };

  const verifyPageCategories = () => {
    let CATEGORIES;
    if (pathname === '/meals') {
      CATEGORIES = MEALS_CATEGORIES;
    } else {
      CATEGORIES = DRINKS_CATEGORIES;
    }
    return CATEGORIES;
  };

  const handleCategoryFilter = (event, category) => {
    const { name } = event.target;
    // start toggle
    if (categoryToggle === name) {
      if (pathname === '/meals') {
        return (dispatch(fetchRecipeMainMeals()));
      }
      return (dispatch(fetchRecipeMainDrinks()));
    }
    setCategoryToggle(category);
    // ends toggle
    if (pathname === '/meals') {
      return (dispatch(fetchCategoryMealsFilter(category)));
    }
    return (dispatch(fetchCategoryDrinksFilter(category)));
  };

  return (
    <main className="recipes">
      <div className="recipe-categories">
        {verifyPageCategories().map((category, index) => {
          if (index < FIVE) {
            return (
              <button
                key={ category.strCategory }
                data-testid={ `${category.strCategory}-category-filter` }
                type="button"
                name={ category.strCategory }
                onClick={ (event) => {
                  handleCategoryFilter(event, category.strCategory);
                } }
                className="categorie-button"
              >
                {category.strCategory}

              </button>
            );
          }
          return true;
        })}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => {
            if (pathname === '/meals') {
              return (dispatch(fetchRecipeMainMeals()));
            }
            return (dispatch(fetchRecipeMainDrinks()));
          } }
        >
          All

        </button>
      </div>
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
