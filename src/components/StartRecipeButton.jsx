import React, { useState, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveInProgressRecipeLocalStorage } from '../services/LocalStorage';
import style from '../style/StartRecipeButton.module.css';

function StartRecipeButton() {
  const recipeMeal = useSelector((globalState) => globalState.meals.recipeMeals);
  const recipeDrink = useSelector((globalState) => globalState.drinks.recipeDrinks);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const mealsOrDrinkId = useParams('/meals/:id');
  const { id } = mealsOrDrinkId;
  let recipeDetail = [];

  if (pathname === `/meals/${id}`) {
    recipeDetail = recipeMeal;
  } else {
    recipeDetail = recipeDrink;
  }

  const ingredientsList = recipeDetail.map((element) => Object.entries(element)
    .filter((elem) => elem[0].includes('strIngredient')
    && elem[1] !== ''
    && elem[1] !== ' '
    && elem[1] !== null)
    .map((ingredients) => ingredients[1])).flat();

  const handleClick = () => {
    if (pathname.includes('meals')) {
      saveInProgressRecipeLocalStorage('meal', recipeMeal[0].idMeal, ingredientsList);
    } else {
      saveInProgressRecipeLocalStorage('drink', recipeDrink[0].idDrink, ingredientsList);
    }
    setRecipeInProgress(true);
    history.push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem(id));
    if (inProgressRecipes !== null && inProgressRecipes !== undefined) {
      setRecipeInProgress(true);
    }
  }, []);

  return (
    <div className={ style.container_button_start }>
      <button
        style={ {
          position: 'fixed',
          bottom: '0px',
        } }
        data-testid="start-recipe-btn"
        type="button"
        onClick={ handleClick }
        className={ style.button_start_recipe }
      >
        <BsPencil className={ style.icon_btn_start } />
        { !recipeInProgress ? 'Start Recipe' : 'Continue Recipe' }
      </button>
    </div>
  );
}

export default StartRecipeButton;
