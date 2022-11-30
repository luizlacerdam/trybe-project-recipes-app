const getMeals = async (radio, search) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?${radio}=${search}`;
  const request = await fetch((ENDPOINT));
  const response = await request.json();
  return response;
};

// export default getMeals;

console.log(getMeals('i', 'water'));
