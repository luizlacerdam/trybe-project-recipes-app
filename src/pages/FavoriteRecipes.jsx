import React from 'react';
import Header from '../components/Header';
import NavBarFavoritesRecipes from '../components/NavBarFavoritesRecipes';
import { getFavoriteRecipeLocalStorage } from '../services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';
import likeAndDeslike from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const allFavoriteRecipes = getFavoriteRecipeLocalStorage('favoriteRecipes');

  return (
    <div>
      <Header title="Favorite Recipes" searchButton={ false } />
      <p>Favorite Recipes</p>
      <NavBarFavoritesRecipes />
      <div>
        {allFavoriteRecipes.map((favorite, index) => (
          <div key={ index }>
            {/* REQUISITO 51 - Caso a receita seja de uma comida */}
            { favorite.type === 'meal'
            && (
              <div>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ favorite.image }
                  alt="favorite.name"
                />
                <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${favorite.nationality} - ${favorite.category}`}
                </p>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Icon share"
                />
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ likeAndDeslike }
                  alt="Icon like and deslike"
                />
              </div>)}
            {/* REQUISITO 52 - Caso a receita seja de uma bebida */}
            { favorite.type === 'drink'
            && (
              <div>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ favorite.image }
                  alt="favorite.name"
                />
                <p data-testid={ `${index}-horizontal-name` }>{favorite.name}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {favorite.alcoholicOrNot}
                </p>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Icon share"
                />
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ likeAndDeslike }
                  alt="Icon like and deslike"
                />
              </div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
