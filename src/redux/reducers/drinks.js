import {
  CLEAN_DRINKS_ERROR, RESPONSE_DRINKS_ERROR, RESPONSE_DRINKS_SUCCESS } from '../actions';

const INIT_STATE = {
  drinks: [],
  error: null,
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
  default:
    return state;
  }
};

export default drinks;
