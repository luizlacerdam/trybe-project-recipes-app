export const getRecipeMealsApi = async (idRecipeMeal) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipeMeal}`;
  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return request.ok ? Promise.resolve(response.meals) : Promise.reject(response);
};

export const getRecipeDrinksApi = async (idRecipeDrink) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipeDrink}`;
  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return request.ok ? Promise.resolve(response.drinks) : Promise.reject(response);
};
