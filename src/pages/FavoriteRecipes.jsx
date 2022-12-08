import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import NavBarFavoritesRecipes from '../components/NavBarFavoritesRecipes';
import { getFavoriteRecipeLocalStorage } from '../services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';
import likeAndDeslike from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const history = useHistory();
  const [linkMsg, setLinkMsg] = useState('');
  const { location: { pathname } } = history;
  const allFavoriteRecipes = getFavoriteRecipeLocalStorage('favoriteRecipes');

  const handleClickShared = () => {
    setLinkMsg('Link copied!');
    copy(`http://localhost:3000${pathname}`);
  };

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

                <button
                  type="button"
                  name={ favorite.name }
                  onClick={ handleClickShared }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Icon share"
                  />
                </button>
                <span>{linkMsg}</span>
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
                <button
                  type="button"
                  name={ favorite.name }
                  onClick={ handleClickShared }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Icon share"
                  />
                </button>
                <span>{linkMsg}</span>
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
