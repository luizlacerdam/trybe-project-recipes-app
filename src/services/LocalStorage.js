export const saveEmailLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};

export const saveInProgressRecipeLocalStorage = (type, idType, ingredients) => {
  if (type === 'meal') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        {
          meals: {
            [idType]: ingredients,
          },
        },
      ));
  } else if (type === 'drink') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        {
          drinks: {
            [idType]: ingredients,
          },
        },
      ));
  }
};

export const saveFavoriteRecipesLocalStorage = (param) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(param));
};

export const getFavoriteRecipeLocalStorage = (param) => {
  const favoriteRecipe = JSON.parse(localStorage.getItem(param));
  return favoriteRecipe;
};
