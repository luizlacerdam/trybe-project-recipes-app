import React from 'react';
import Header from '../components/Header';
import NavBarFavoritesRecipes from '../components/NavBarFavoritesRecipes';
import { getFavoriteRecipeLocalStorage } from '../services/LocalStorage';

function FavoriteRecipes() {
  const allFavoriteRecipes = getFavoriteRecipeLocalStorage('favoriteRecipes');
  console.log('Favoritos:', allFavoriteRecipes);

  return (
    <div>
      <Header title="Favorite Recipes" searchButton={ false } />
      <p>Favorite Recipes</p>
      <NavBarFavoritesRecipes />
      <div>
        {allFavoriteRecipes.map((favorite, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ favorite.image }
              alt="favorite.name"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{favorite.category}</p>
            <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
            >
              Share
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              type="button"
            >
              Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
