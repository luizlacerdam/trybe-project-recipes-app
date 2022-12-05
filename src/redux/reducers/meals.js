import { RESPONSE_MEALS_ERROR,
  RESPONSE_MEALS_SUCCESS,
  RESPONSE_RECIPES_MAIN_MEALS_SUCCESS,
  RESPONSE_RECIPE_MEALS_SUCCESS,
  RESPONSE_RECIPES_CATEGORIES_MEALS_SUCCESS } from '../actions';

const INIT_STATE = {
  meals: [],
  categoriesRecipeMeals: [],
  error: null,
  recipeMeals: [],
};

const meals = (state = INIT_STATE, action) => {
  switch (action.type) {
  case RESPONSE_MEALS_SUCCESS:
    return {
      ...state,
      meals: [...action.meals],
    };
  case RESPONSE_MEALS_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case RESPONSE_RECIPES_MAIN_MEALS_SUCCESS:
    return {
      ...state,
      meals: action.meals,
    };
      
  case RESPONSE_RECIPE_MEALS_SUCCESS:
    return {
      ...state,
      recipeMeals: [...action.responseRecipesMeals],
    };
      
  case RESPONSE_RECIPES_CATEGORIES_MEALS_SUCCESS:
    return {
      ...state,
      categoriesRecipeMeals: action.categories,

    };
  default:
    return state;
  }
};

export default meals;
