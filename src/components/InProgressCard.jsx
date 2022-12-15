import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRecipeDetailsDrinks, fetchRecipeDetailsMeals } from '../redux/actions';
import { saveCurrentRecipe } from '../redux/actions/actionsRecommendations';
import '../style/RecipeInProgress.css';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

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
            className="thumb_recipe_inProgress"
          />
          <div className="box_info_recipe">
            <h1
              data-testid="recipe-title"
              className="title_recipe_inProgress"
            >
              { page === 'Meal' ? recipe.strMeal
                : recipe.strDrink }
            </h1>
            <p data-testid="recipe-category">{recipe.strCategory}</p>
            <div className="box_butons_recipe_inProgress">
              <ShareButton />
              <FavoriteButton recipeProp={ recipe } />
            </div>
          </div>
          <div className="list_ingredient_recipe_inProgress">
            <h2 className="title_default_inProgress">Ingredients</h2>
            {ingredientList.map((ingredient, index) => (
              <ul key={ `ingredient-${index}` } className="list_ingredients_inProgress">
                <li>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    htmlFor={ `ingredient-${index}` }
                    className={ checkList.includes(ingredient) ? 'checked' : '' }
                  >
                    <input
                      type="checkbox"
                      name={ ingredient }
                      id={ `ingredient-${index}` }
                      onChange={ handleChange }
                      checked={ checkList.includes(ingredient) }
                      className="input_check_inProgress"
                    />
                    { ingredient }
                  </label>
                </li>
              </ul>

            ))}
          </div>
          <div>
            <h2 className="title_default_inProgress">Instructions</h2>
            <p data-testid="instructions" className="instructions_inProgress">
              {recipe.strInstructions}
            </p>
            <div className="container_btn_done_recipe">
              <button
                disabled={ disabled }
                data-testid="finish-recipe-btn"
                type="button"
                onClick={ handleClick }
                className="btn_done_recipe"

              >
                <AiOutlineCheckCircle className="icon_done_recipe" />
                Done
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InProgressCard;
