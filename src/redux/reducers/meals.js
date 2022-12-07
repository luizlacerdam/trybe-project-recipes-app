import {
  CLEAN_MEALS_ERROR, RESPONSE_MEALS_ERROR,
  RESPONSE_MEALS_SUCCESS, RESPONSE_RECIPES_CATEGORIES_MEALS_SUCCESS,
  RESPONSE_RECIPES_MAIN_MEALS_SUCCESS,
  RESPONSE_RECIPE_MEALS_SUCCESS,
  RESPONSE_DRINKS_RECOMMENDATION_SUCCESS,
  RESPONSE_DRINKS_RECOMMENDATION_ERROR,
} from '../actions/actionsTypes';

const INIT_STATE = {
  meals: [],
  categoriesRecipeMeals: [],
  error: null,
  recipeMeals: [],
  recommendationsDrinks: [],
  errorRecommendations: null,
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
      error: 'error',
    };
  case CLEAN_MEALS_ERROR:
    return {
      ...state,
      error: null,
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
  case RESPONSE_DRINKS_RECOMMENDATION_SUCCESS:
    return {
      ...state,
      recommendationsDrinks: action.responseRecommendation,
    };
  case RESPONSE_DRINKS_RECOMMENDATION_ERROR:
    return {
      ...state,
      errorRecommendations: action.error,
    };
  default:
    return state;
  }
};

export default meals;
