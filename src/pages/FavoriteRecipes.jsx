import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  getFavoriteRecipeLocalStorage, saveFavoriteRecipesLocalStorage,
} from '../services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';
import likeAndDeslike from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [linkMsg, setLinkMsg] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);
  const [controller, setController] = useState(false);

  useEffect(() => {
    const newFavoriteRecipes = getFavoriteRecipeLocalStorage('favoriteRecipes');
    setFavoriteRecipes(newFavoriteRecipes);
    setAllFavoriteRecipes(newFavoriteRecipes);
  }, [controller]);

  const handleClickShared = ({ target }) => {
    const { name, id } = target;
    setLinkMsg('Link copied!');
    if (name.includes('meal')) {
      copy(`http://localhost:3000/meals/${id}`);
    } else if (name.includes('drink')) {
      copy(`http://localhost:3000/drinks/${id}`);
    }
  };

  const handleDeslikeRecipe = ({ target }) => {
    const { id } = target;
    const upDateFavoriteRecipesLocalStorage = favoriteRecipes
      .filter((favorite) => favorite.id !== id);
    saveFavoriteRecipesLocalStorage(upDateFavoriteRecipesLocalStorage);
    setController(!controller);
  };

  const handleFilterMeals = () => {
    const filtredMealsFavorite = favoriteRecipes
      .filter((favoriteRecipe) => favoriteRecipe.type === 'meal');
    setFavoriteRecipes(filtredMealsFavorite);
  };

  const handleFilterDrinks = () => {
    const filtredDrinksFavorite = favoriteRecipes
      .filter((favoriteRecipe) => favoriteRecipe.type === 'drink');
    setFavoriteRecipes(filtredDrinksFavorite);
  };

  return (
    <div>
      <Header title="Favorite Recipes" searchButton={ false } />
      <p>Favorite Recipes</p>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(allFavoriteRecipes) }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleFilterMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleFilterDrinks }
        >
          Drinks
        </button>
      </div>
      <div>
        {!favoriteRecipes ? '' : favoriteRecipes.map((favorite, index) => (
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
                  onClick={ handleClickShared }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    name={ `${favorite.name}-${favorite.type}` }
                    id={ favorite.id }
                    src={ shareIcon }
                    alt="Icon share"
                  />
                </button>
                <span>{linkMsg}</span>
                <button
                  type="button"
                  onClick={ handleDeslikeRecipe }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    id={ favorite.id }
                    src={ likeAndDeslike }
                    alt="Icon like and deslike"
                  />
                </button>
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
                  onClick={ handleClickShared }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    name={ `${favorite.name}-${favorite.type}` }
                    id={ favorite.id }
                    src={ shareIcon }
                    alt="Icon share"
                  />
                </button>
                <span>{linkMsg}</span>
                <button
                  type="button"
                  onClick={ handleDeslikeRecipe }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    id={ favorite.id }
                    src={ likeAndDeslike }
                    alt="Icon like and deslike"
                  />
                </button>
              </div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
