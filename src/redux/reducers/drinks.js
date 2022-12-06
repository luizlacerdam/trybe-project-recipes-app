import { RESPONSE_DRINKS_ERROR,
  RESPONSE_DRINKS_SUCCESS,
  RESPONSE_RECIPES_CATEGORIES_DRINKS_SUCCE,
  RESPONSE_RECIPE_DRINKS_SUCCESS,
  RESPONSE_RECIPES_MAIN_DRINKS_SUCCESS,
  CLEAN_DRINKS_ERROR } from '../actions';

const INIT_STATE = {
  drinks: [],
  categoriesRecipeDrinks: [],
  error: null,
  recipeDrinks: [],
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
  default:
    return state;
  }
};

export default drinks;
