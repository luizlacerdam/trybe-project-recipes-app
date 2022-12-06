const categoryDrinksFilterApi = async (category) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

  const request = await fetch(ENDPOINT);
  const response = await request.json();
  console.log(response);
  return request.ok ? Promise.resolve(response.drinks) : Promise.reject(response);
};

export default categoryDrinksFilterApi;
