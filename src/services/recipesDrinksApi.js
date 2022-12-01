const recipesDrinksApi = async () => {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return request.ok ? Promise.resolve(response.drinks) : Promise.reject(response);
};

export default recipesDrinksApi;
