import recipesDrinksApi from '../../services/recipesDrinksApi';
import recipesMealsApi from '../../services/recipesMealsApi';
import {
  REQUEST_MEALS_RECOMMENDATION,
  RESPONSE_MEALS_RECOMMENDATION_SUCCESS,
  RESPONSE_MEALS_RECOMMENDATION_ERROR,
  REQUEST_DRINKS_RECOMMENDATION,
  RESPONSE_DRINKS_RECOMMENDATION_SUCCESS,
  RESPONSE_DRINKS_RECOMMENDATION_ERROR,
} from './actionsTypes';

export const requestMealsRecommendation = () => ({
  type: REQUEST_MEALS_RECOMMENDATION,
});
export const responseMealsRecommendationSucess = (responseRecommendation) => ({
  type: RESPONSE_MEALS_RECOMMENDATION_SUCCESS,
  responseRecommendation,
});
export const responseMealsRecommendationError = (error) => ({
  type: RESPONSE_MEALS_RECOMMENDATION_ERROR,
  error,
});
export const requestDrinksRecommendation = () => ({
  type: REQUEST_DRINKS_RECOMMENDATION,
});
export const responseDrinksRecommendationSucess = (responseRecommendation) => ({
  type: RESPONSE_DRINKS_RECOMMENDATION_SUCCESS,
  responseRecommendation,
});
export const responseDrinksRecommendationError = (error) => ({
  type: RESPONSE_DRINKS_RECOMMENDATION_ERROR,
  error,
});

// <--------------------- Thunk page of recommendation --------------------->
export function fetchRecommendationMeals() {
  return async (dispatch) => {
    dispatch(requestMealsRecommendation());
    try {
      const response = await recipesMealsApi();
      dispatch(responseMealsRecommendationSucess(response));
    } catch (error) {
      dispatch(responseMealsRecommendationError(error));
    }
  };
}
export function fetchRecommendationDrinks() {
  return async (dispatch) => {
    dispatch(requestDrinksRecommendation());
    try {
      const response = await recipesDrinksApi();
      dispatch(responseDrinksRecommendationSucess(response));
    } catch (error) {
      dispatch(responseDrinksRecommendationError(error));
    }
  };
}
// <--------------------- Thunk page of recommendation --------------------->
