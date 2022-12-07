import { RESPONSE_DRINKS_ERROR,
  RESPONSE_DRINKS_SUCCESS,
  RESPONSE_RECIPES_CATEGORIES_DRINKS_SUCCE,
  RESPONSE_RECIPE_DRINKS_SUCCESS,
  RESPONSE_RECIPES_MAIN_DRINKS_SUCCESS,
  CLEAN_DRINKS_ERROR,
  RESPONSE_MEALS_RECOMMENDATION_SUCCESS,
  RESPONSE_MEALS_RECOMMENDATION_ERROR,
} from '../actions/actionsTypes';

const INIT_STATE = {
  drinks: [],
  categoriesRecipeDrinks: [],
  error: null,
  recipeDrinks: [],
  recommendationsMeals: [],
  errorRecommendations: null,
};

const drinks = (state = INIT_STATE, action) => {
  switch (action.type) {
  case RESPONSE_DRINKS_SUCCESS:
    return {
      ...state,
      drinks: [...action.drinks],
    };
  case RESPONSE_DRINKS_ERROR:
    return {
      ...state,
      error: 'error',
    };
  case CLEAN_DRINKS_ERROR:
    return {
      ...state,
      error: null,
    };
  case RESPONSE_RECIPES_MAIN_DRINKS_SUCCESS:
    return {
      ...state,
      drinks: action.drinks,
    };

  case RESPONSE_RECIPE_DRINKS_SUCCESS:
    return {
      ...state,
      recipeDrinks: [...action.responseRecipeDrinks],
    };

  case RESPONSE_RECIPES_CATEGORIES_DRINKS_SUCCE:
    return {
      ...state,
      categoriesRecipeDrinks: action.categories,
    };
  case RESPONSE_MEALS_RECOMMENDATION_SUCCESS:
    return {
      ...state,
      recommendationsMeals: action.responseRecommendation,
    };
  case RESPONSE_MEALS_RECOMMENDATION_ERROR:
    return {
      ...state,
      errorRecommendations: action.error,
    };
  default:
    return state;
  }
};

export default drinks;
