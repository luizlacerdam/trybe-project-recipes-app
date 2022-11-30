import { RESPONSE_MEALS_ERROR, RESPONSE_MEALS_SUCCESS } from '../actions';

const INIT_STATE = {
  meals: [],
  error: null,
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
  default:
    return state;
  }
};

export default meals;