import { RESPONSE_DRINKS_ERROR,
  RESPONSE_DRINKS_SUCCESS,
  RESPONSE_RECIPES_MAIN_DRINKS_SUCCESS,
  RESPONSE_RECIPE_DRINKS_SUCCESS,
} from '../actions';

const INIT_STATE = {
  drinks: [],
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
      error: action.error,
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
  default:
    return state;
  }
};

export default drinks;
