import getDrinkApi from '../../services/drinksApi';
import getMeals from '../../services/mealsApi';

// action type
export const SAVE_USER = 'SAVE_USER';
export const REQUEST_MEALS = 'REQUEST_MEALS';
export const RESPONSE_MEALS_SUCCESS = 'RESPONSE_MEALS_SUCCESS';
export const RESPONSE_MEALS_ERROR = 'RESPONSE_MEALS_ERROR';
export const REQUEST_DRINKS = 'REQUEST_DRINKS';
export const RESPONSE_DRINKS_SUCCESS = 'RESPONSE_DRINKS_SUCCESS';
export const RESPONSE_DRINKS_ERROR = 'RESPONSE_DRINKS_ERROR';
export const CLEAN_DRINKS_ERROR = 'CLEAN_DRINKS_ERROR';
export const CLEAN_MEALS_ERROR = 'CLEAN_MEALS_ERROR';

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

export const responseMealsError = () => ({
  type: RESPONSE_MEALS_ERROR,
});

export const requestDrinks = () => ({
  type: REQUEST_DRINKS,
});

export const responseDrinksSuccess = (drinks) => ({
  type: RESPONSE_DRINKS_SUCCESS,
  drinks,
});

export const responseDrinksError = () => ({
  type: RESPONSE_DRINKS_ERROR,
});

export function fetchMeals(radio, search, filter) {
  return async (dispatch) => {
    dispatch(requestMeals());
    try {
      const response = await getMeals(radio, search, filter);
      dispatch(responseMealsSuccess(response));
    } catch (error) {
      dispatch(responseMealsError());
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
      dispatch(responseDrinksError());
    }
  };
}

export const cleanDrinksError = () => ({
  type: CLEAN_DRINKS_ERROR,
});

export const cleanMealsError = () => ({
  type: CLEAN_DRINKS_ERROR,
});
