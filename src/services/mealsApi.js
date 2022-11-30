const getMeals = async (radio, search, filter) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/${filter}.php?${radio}=${search}`;
  const request = await fetch(ENDPOINT);
  const response = await request.json();
  console.log(response);
  return request.ok ? Promise.resolve(response.meals) : Promise.reject(response);
};

export default getMeals;
