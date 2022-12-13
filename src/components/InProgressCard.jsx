import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRecipeDetailsDrinks, fetchRecipeDetailsMeals } from '../redux/actions';
import { saveCurrentRecipe } from '../redux/actions/actionsRecommendations';
import '../styles/RecipeInProgress.css';

function InProgressCard() {
  const currentRecipe = useSelector((state) => state.recipeInProgress.currentRecipe);
  const [checkList, setCheckList] = useState([]);
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
  const dispatch = useDispatch();
  const { location: { pathname } } = history;
  const mealsOrDrinkId = useParams('/meals/:id/in-progress');
  const { id } = mealsOrDrinkId;
  const recipeDetailMeal = useSelector((globalState) => globalState.meals.recipeMeals);
  const recipeDetailDrink = useSelector((globalState) => globalState.drinks.recipeDrinks);
  const [disabled, setDisabled] = useState(true);
  const date = new Date();

  useEffect(() => {
    const getPage = () => {
      if (pathname.includes('meals')) {
        setPage('Meal');
        dispatch(fetchRecipeDetailsMeals(id));
      } else {
        setPage('Drink');
        dispatch(fetchRecipeDetailsDrinks(id));
      }
    };
    getPage();
    const savedCheckList = JSON.parse(localStorage.getItem(id));
    if (savedCheckList) localStorage.removeItem(id);
    if (savedCheckList !== null) setCheckList(savedCheckList);
  }, [id]);

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    if (checked === true) setCheckList([...checkList, name]);
    if (checked === false) {
      const result = checkList.filter((element) => element !== name);
      setCheckList([...result]);
    }
  };

  useEffect(() => {
    if (pathname.includes('/meals')) {
      dispatch(saveCurrentRecipe(recipeDetailMeal));
      setPage('Meal');
    } else {
      dispatch(saveCurrentRecipe(recipeDetailDrink));
      setPage('Drink');
    }
  }, [recipeDetailDrink, recipeDetailMeal]);

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(checkList));
    if (checkList.length === ingredientList.length) setDisabled(false);
    if (checkList.length !== ingredientList.length) setDisabled(true);
  }, [checkList]);

  const saveObject = currentRecipe.map((recipe) => (
    {
      id,
      type: page.toLowerCase(),
      nationality: recipe.strArea === undefined ? '' : recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: page === 'Meal' ? '' : recipe.strAlcoholic,
      name: recipe[`str${page}`],
      image: recipe[`str${page}Thumb`],
      doneDate: date.toISOString(),
      tags: ((recipe.strTags !== null && recipe.strTags)
        ? recipe.strTags.split(',') : []),
    }
  ));

  const handleClick = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(saveObject));
    history.push('/done-recipes');
  };

  return (
    <div>
      {currentRecipe.map((recipe) => (
        <div key={ id }>
          <img
            data-testid="recipe-photo"
            src={ page === 'Meal' ? recipe.strMealThumb
              : recipe.strDrinkThumb }
            alt="Thumb"
          />
          <h1
            data-testid="recipe-title"
          >
            { page === 'Meal' ? recipe.strMeal
              : recipe.strDrink }
          </h1>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">Favorite</button>
          <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <button
            disabled={ disabled }
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ handleClick }
          >
            Done
          </button>
          <div>
            {ingredientList.map((ingredient, index) => (
              <label
                data-testid={ `${index}-ingredient-step` }
                key={ `ingredient-${index}` }
                htmlFor={ `ingredient-${index}` }
                className={ checkList.includes(ingredient) ? 'checked' : '' }
              >
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ `ingredient-${index}` }
                  onChange={ handleChange }
                  checked={ checkList.includes(ingredient) }
                />
                { ingredient }
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InProgressCard;
