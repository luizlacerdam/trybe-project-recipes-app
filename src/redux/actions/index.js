import getDrinkApi from '../../services/drinksApi';
import getMeals from '../../services/mealsApi';
import recipesMealsApi from '../../services/recipesMealsApi';
import recipesDrinksApi from '../../services/recipesDrinksApi';
import { getRecipeDrinksApi, getRecipeMealsApi } from '../../services/recipesApi';

// action type
export const SAVE_USER = 'SAVE_USER';
export const REQUEST_MEALS = 'REQUEST_MEALS';
export const RESPONSE_MEALS_SUCCESS = 'RESPONSE_MEALS_SUCCESS';
export const RESPONSE_MEALS_ERROR = 'RESPONSE_MEALS_ERROR';
export const REQUEST_DRINKS = 'REQUEST_DRINKS';
export const RESPONSE_DRINKS_SUCCESS = 'RESPONSE_DRINKS_SUCCESS';
export const RESPONSE_DRINKS_ERROR = 'RESPONSE_DRINKS_ERROR';
export const REQUEST_RECIPES_MAIN_MEALS = 'REQUEST_RECIPES_MAIN_MEALS';
export const RESPONSE_RECIPES_MAIN_MEALS_SUCCESS = 'RESPONSE_RECIPES_MAIN_MEALS_SUCCESS';
export const RESPONSE_RECIPES_MAIN_MEALS_ERROR = 'RESPONSE_RECIPES_MAIN_MEALS_ERROR';
export const REQUEST_RECIPES_MAIN_DRINKS = 'REQUEST_RECIPES_MAIN_DRINKS';
export const
  RESPONSE_RECIPES_MAIN_DRINKS_SUCCESS = 'RESPONSE_RECIPES_MAIN_DRINKS_SUCCESS';
export const RESPONSE_RECIPES_MAIN_DRINKS_ERROR = 'RESPONSE_RECIPES_MAIN_DRINKS_ERROR';
export const REQUEST_RECIPE_MEALS = 'REQUEST_RECIPE_MEALS';
export const RESPONSE_RECIPE_MEALS_SUCCESS = 'RESPONSE_RECIPE_MEALS_SUCCESS';
export const RESPONSE_RECIPE_MEALS_ERROR = 'RESPONSE_RECIPE_MEALS_ERROR';
export const REQUEST_RECIPE_DRINKS = 'REQUEST_RECIPE_DRINKS';
export const RESPONSE_RECIPE_DRINKS_SUCCESS = 'RESPONSE_RECIPE_DRINKS_SUCCESS';
export const RESPONSE_RECIPE_DRINKS_ERROR = 'RESPONSE_RECIPE_DRINKS_ERROR';

// action creator
export const saveUser = (userData) => ({
  type: SAVE_USER,
  userData,
});

export const requestMeals = () => ({
  type: REQUEST_MEALS,
});

export const responseMealsSuccess = (meals) => ({
  type: RESPONSE_MEALS_SUCCESS,
  meals,
});

export const responseMealsError = (error) => ({
  type: RESPONSE_MEALS_ERROR,
  error,
});

export const requestDrinks = () => ({
  type: REQUEST_DRINKS,
});

export const responseDrinksSuccess = (drinks) => ({
  type: RESPONSE_DRINKS_SUCCESS,
  drinks,
});

export const responseDrinksError = (error) => ({
  type: RESPONSE_DRINKS_ERROR,
  error,
});

export const requestRecipesMainMeals = () => ({
  type: REQUEST_RECIPES_MAIN_MEALS,
});

export const responseRecipesMainMealsSucess = (meals) => ({
  type: RESPONSE_RECIPES_MAIN_MEALS_SUCCESS,
  meals,
});

export const requestRecipesMainDrinks = () => ({
  type: REQUEST_RECIPES_MAIN_DRINKS,
});

export const responseRecipesMainDrinksSucess = (drinks) => ({
  type: RESPONSE_RECIPES_MAIN_DRINKS_SUCCESS,
  drinks,
});

export const requestRecipeMeals = () => ({
  type: REQUEST_RECIPE_MEALS,
});

export const responseRecipeMealsSuccess = (responseRecipesMeals) => ({
  type: RESPONSE_RECIPE_MEALS_SUCCESS,
  responseRecipesMeals,
});

export const responseRecipeMealsError = (error) => ({
  type: RESPONSE_RECIPE_MEALS_ERROR,
  error,
});

export const requestRecipeDrinks = () => ({
  type: REQUEST_RECIPE_DRINKS,
});

export const responseRecipeDrinksSuccess = (responseRecipeDrinks) => ({
  type: RESPONSE_RECIPE_DRINKS_SUCCESS,
  responseRecipeDrinks,
});

export const responseRecipeDrinksError = (error) => ({
  type: RESPONSE_RECIPE_DRINKS_ERROR,
  error,
});

export function fetchMeals(radio, search, filter) {
  return async (dispatch) => {
    dispatch(requestMeals());
    try {
      const response = await getMeals(radio, search, filter);
      dispatch(responseMealsSuccess(response));
    } catch (error) {
      dispatch(responseMealsError(error));
    }
  };
}

export function fetchDrinks(radio, search, filter) {
  return async (dispatch) => {
    dispatch(requestDrinks());
    try {
      const response = await getDrinkApi(radio, search, filter);
      dispatch(responseDrinksSuccess(response));
    } catch (error) {
      dispatch(responseDrinksError(error));
    }
  };
}

export function fetchRecipeMainMeals() {
  return async (dispatch) => {
    dispatch(requestRecipesMainMeals());
    try {
      const response = await recipesMealsApi();
      dispatch(responseRecipesMainMealsSucess(response));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchRecipeMainDrinks() {
  return async (dispatch) => {
    dispatch(requestRecipesMainDrinks());
    try {
      const response = await recipesDrinksApi();
      dispatch(responseRecipesMainDrinksSucess(response));
    } catch (error) {
      console.log(error);
    }
  };
}

// <--------------------- Thunk pagina de Recipe Details --------------------->
export function fetchRecipeDetailsMeals(idRecipeMeals) {
  return async (dispatch) => {
    dispatch(requestRecipeMeals());
    try {
      const response = await getRecipeMealsApi(idRecipeMeals);
      dispatch(responseRecipeMealsSuccess(response));
    } catch (error) {
      dispatch(responseRecipeMealsError(error));
    }
  };
}

export function fetchRecipeDetailsDrinks(idRecipeDrinks) {
  return async (dispatch) => {
    dispatch(requestRecipeDrinks());
    try {
      const response = await getRecipeDrinksApi(idRecipeDrinks);
      dispatch(responseRecipeDrinksSuccess(response));
    } catch (error) {
      dispatch(responseRecipeDrinksError(error));
    }
  };
}
// <--------------------- Thunk pagina de Recipe Details --------------------->
