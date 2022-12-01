import getDrinkApi from '../../services/drinksApi';
import getMeals from '../../services/mealsApi';
import { LOGIN, LOGOUT } from './actionsTypes';
import recipesMealsApi from '../../services/recipesMealsApi';
import recipesDrinksApi from '../../services/recipesDrinksApi';
import categoriesMealsApi from '../../services/categoriesMealsApi';
import categoriesDrinksApi from '../../services/categoriesDrinksApi';

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

export const REQUEST_RECIPES_CATEGORIES_MEALS = 'REQUEST_RECIPES_CATEGORIES_MEALS';
export const
  RESPONSE_RECIPES_CATEGORIES_MEALS_SUCCESS = 'RESPONSE_RECIPES_CATEGORIES_MEALS_SUCCESS';

export const REQUEST_RECIPES_CATEGORIES_DRINKS = 'REQUEST_RECIPES_CATEGORIES_DRINKS';
export const
  RESPONSE_RECIPES_CATEGORIES_DRINKS_SUCCE = 'RESPONSE_RECIPES_CATEGORIES_DRINKS_SUCCE';

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

export const actLogin = (state) => ({
  type: LOGIN,
  state,
});

export const actLogout = () => ({
  type: LOGOUT,
=======
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

export const requestRecipesCategoriesMeals = () => ({
  type: REQUEST_RECIPES_CATEGORIES_MEALS,
});

export const responseRecipesCategoriesMealsSucess = (categories) => ({
  type: RESPONSE_RECIPES_CATEGORIES_MEALS_SUCCESS,
  categories,
});

export const requestRecipesCategoriesDrinks = () => ({
  type: REQUEST_RECIPES_CATEGORIES_DRINKS,
});

export const responseRecipesCategoriesDrinksSucess = (categories) => ({
  type: RESPONSE_RECIPES_CATEGORIES_DRINKS_SUCCE,
  categories,
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

export function fetchRecipeCategoriesMeals() {
  return async (dispatch) => {
    dispatch(requestRecipesCategoriesMeals());
    try {
      const response = await categoriesMealsApi();
      dispatch(responseRecipesCategoriesMealsSucess(response));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchRecipeCategoriesDrinks() {
  return async (dispatch) => {
    dispatch(requestRecipesCategoriesDrinks());
    try {
      const response = await categoriesDrinksApi();
      dispatch(responseRecipesCategoriesDrinksSucess(response));
    } catch (error) {
      console.log(error);
    }
  };
}
