import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRecipeMainDrinks, fetchRecipeMainMeals } from '../redux/actions';
import RecipesCard from './RecipesCard';

function Recipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;
  const TWELVE = 12;
  const MEALS = useSelector((state) => state.meals.meals);
  const DRINKS = useSelector((state) => state.drinks.drinks);

  useEffect(() => {
    if (pathname === '/meals') {
      dispatch(fetchRecipeMainMeals());
    } else
    if (pathname === '/drinks') {
      dispatch(fetchRecipeMainDrinks());
    }
  }, []);

  const verifyPage = () => {
    let RECIPES;
    if (pathname === '/meals') {
      RECIPES = MEALS;
    } else
    if (pathname === '/drinks') {
      RECIPES = DRINKS;
    }
    return RECIPES;
  };

  return (
    <main>
      {verifyPage().map((recipe, index) => {
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
