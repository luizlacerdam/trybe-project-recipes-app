import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CarouselRecommendations from '../components/CarouselRecommendations';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import StartRecipeButton from '../components/StartRecipeButton';
import { fetchRecipeDetailsDrinks, fetchRecipeDetailsMeals } from '../redux/actions';
import {
  fetchRecommendationDrinks,
  fetchRecommendationMeals,
  saveCurrentRecipe } from '../redux/actions/actionsRecommendations';
import style from '../style/RecipeDetails.module.css';

function RecipeDetails() {
  const recipeDetailMeal = useSelector((globalState) => globalState.meals.recipeMeals);
  const recipeDetailDrink = useSelector((globalState) => globalState.drinks.recipeDrinks);
  const [isMeal, setIsMeal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const mealsOrDrinkId = useParams('/meals/:id');
  const { id } = mealsOrDrinkId;
  const { location: { pathname } } = history;
  let recipeDetail = [];

  useEffect(() => {
    if (pathname === `/meals/${id}`) {
      dispatch(fetchRecipeDetailsMeals(id));
      dispatch(fetchRecommendationDrinks());
      setIsMeal(true);
    } else {
      dispatch(fetchRecipeDetailsDrinks(id));
      dispatch(fetchRecommendationMeals());
      setIsMeal(false);
    }
  }, []);

  useEffect(() => {
    if (pathname === `/meals/${id}`) {
      dispatch(saveCurrentRecipe(recipeDetailMeal));
    } else {
      dispatch(saveCurrentRecipe(recipeDetailDrink));
    }
  }, [recipeDetailDrink, recipeDetailMeal]);

  if (pathname === `/meals/${id}`) {
    recipeDetail = recipeDetailMeal;
  } else {
    recipeDetail = recipeDetailDrink;
  }

  const handleRecipeProp = () => {
    let recipeProp;
    if (pathname === `/meals/${id}`) {
      recipeProp = recipeDetailMeal;
    } else {
      recipeProp = recipeDetailDrink;
    }
    return recipeProp[0];
  };
  const ingredientsList = recipeDetail.map((element) => Object.entries(element)
    .filter((elem) => elem[0].includes('strIngredient')
    && elem[1] !== ''
    && elem[1] !== ' '
    && elem[1] !== null)
    .map((ingredients) => ingredients[1])).flat();

  const measureList = recipeDetail.map((element) => Object.entries(element)
    .filter((elem) => elem[0].includes('strMeasure')
    && elem[1] !== ''
    && elem[1] !== ' '
    && elem[1] !== null)
    .map((ingredients) => ingredients[1])).flat();

  return (
    <div className={ style.recipe_details }>
      { recipeDetail.map((recipe, index) => (
        <div key={ index }>
          <div>
            <img
              data-testid="recipe-photo"
              src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
              alt={ isMeal ? recipe.strMeal : recipe.strDrink }
              className={ style.details_image }
            />
          </div>
          <div className={ style.header_buttons }>
            <div className={ style.share_favorite }>
              <ShareButton />
              <FavoriteButton recipeProp={ handleRecipeProp() } />
            </div>
            <h3 className={ style.details_title } data-testid="recipe-title">
              { isMeal ? recipe.strMeal : recipe.strDrink }
            </h3>
          </div>
          { isMeal && <p data-testid="recipe-category">{recipe.strCategory}</p> }
          { !isMeal && <p data-testid="recipe-category">{recipe.strAlcoholic}</p> }
          { ingredientsList.map((ingredient, idx) => (
            <ul key={ idx }>
              <li data-testid={ `${idx}-ingredient-name-and-measure` }>
                {`${ingredient} - ${measureList[idx]}`}
              </li>
            </ul>
          ))}
          <p data-testid="instructions">{recipe.strInstructions}</p>
          { isMeal && <iframe
            data-testid="video"
            width="560"
            height="315"
            title="video-recipe"
            src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=').pop()}` }
          /> }
        </div>
      )) }
      <CarouselRecommendations />
      <StartRecipeButton />
    </div>
  );
}

export default RecipeDetails;
