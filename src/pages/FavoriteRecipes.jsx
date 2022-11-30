import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" searchButton={ false } />
      <p>Favorite Recipes</p>
    </div>
  );
}

export default FavoriteRecipes;
