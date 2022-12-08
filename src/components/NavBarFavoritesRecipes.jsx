import React from 'react';

function NavBarFavoritesRecipes() {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
    </div>
  );
}

export default NavBarFavoritesRecipes;
