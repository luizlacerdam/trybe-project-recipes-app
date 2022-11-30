import getMeals from '../../services/mealsApi';

// action type
export const SAVE_USER = 'SAVE_USER';
export const REQUEST_MEALS = 'REQUEST_MEALS';
export const RESPONSE_MEALS_SUCCESS = 'RESPONSE_MEALS_SUCCESS';
export const RESPONSE_MEALS_ERROR = 'RESPONSE_MEALS_ERROR';

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
