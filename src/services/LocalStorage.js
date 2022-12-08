export const saveEmailLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};

export const saveInProgressRecipeLocalStorage = (type, idType, ingredients) => {
  if (type === 'meals') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        {
          meals: {
            idType: ingredients,
          },
        },
      ));
  } else if (typeRecipe === 'drink') {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        {
          drinks: {
            idType: ingredients,
          },
        },
      ));
  }
};

export const getFavoriteRecipeLocalStorage = (param) => {
  const favoriteRecipe = JSON.parse(localStorage.getItem(param));
  return favoriteRecipe;
};
