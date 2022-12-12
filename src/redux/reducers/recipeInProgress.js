import { SAVE_CURRENT_RECIPE } from '../actions/actionsTypes';

const INIT_STATE = {
  currentRecipe: [],
};

const drinks = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENT_RECIPE:
    return {
      ...state,
      currentRecipe: action.currentRecipe,
    };
  default:
    return state;
  }
};

export default drinks;
