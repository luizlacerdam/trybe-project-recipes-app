const recipesMealsApi = async () => {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return request.ok ? Promise.resolve(response.meals) : Promise.reject(response);
};

export default recipesMealsApi;
