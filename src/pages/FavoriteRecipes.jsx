/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import {
  getFavoriteRecipeLocalStorage, saveFavoriteRecipesLocalStorage,
} from '../services/LocalStorage';
import style from '../style/FavoriteRecipes.module.css';
import ShareButton from '../components/ShareButton';
import Icon from '../components/Icon';

// const copy = require('clipboard-copy');

function FavoriteRecipes() {
  // const [linkMsg, setLinkMsg] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);
  const [controller, setController] = useState(false);

  useEffect(() => {
    const newFavoriteRecipes = getFavoriteRecipeLocalStorage('favoriteRecipes');
    setFavoriteRecipes(newFavoriteRecipes);
    setAllFavoriteRecipes(newFavoriteRecipes);
  }, [controller]);

  // const handleClickShared = ({ target }) => {
  //   const { name, id } = target;
  //   setLinkMsg('Link copied!');
  //   if (name.includes('meal')) {
  //     copy(`http://localhost:3000/meals/${id}`);
  //   } else {
  //     copy(`http://localhost:3000/drinks/${id}`);
  //   }
  // };

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
    <div className={ style.favorite_recipe_card }>
      <Header title="Favorite Recipes" searchButton={ false } />
      <div className={ style.container_buttons_filter }>
        <button
          className={ style.categorie_button }
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFavoriteRecipes(allFavoriteRecipes) }
        >
          <Icon shape="AllMealsDrinks" />
          <p className={ style.button_text }>
            All
          </p>
        </button>
        <button
          className={ style.categorie_button }
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleFilterMeals }
        >
          <Icon shape="AllMeals" />
          <p className={ style.button_text }>
            Meals
          </p>
        </button>
        <button
          className={ style.categorie_button }
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleFilterDrinks }
        >
          <Icon shape="AllDrinks" />
          <p className={ style.button_text }>
            Drinks
          </p>
        </button>
      </div>
      <div className={ style.container_favorites }>
        {favoriteRecipes && favoriteRecipes.map((favorite, index) => (
          <div key={ index }>
            <div className={ style.box_favorites }>
              <Link
                to={ favorite.type === 'meal'
                  ? `/meals/${favorite.id}`
                  : `/drinks/${favorite.id}` }
                className={ style.link_thumb }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ favorite.image }
                  alt="favorite.name"
                  className={ style.thumb }
                />
              </Link>
              <div className={ style.box_info_recipe_favorite }>
                <Link
                  to={ favorite.type === 'meal'
                    ? `/meals/${favorite.id}`
                    : `/drinks/${favorite.id}` }
                >
                  <p data-testid={ `${index}-horizontal-name` } className={ style.title }>
                    {favorite.name}
                  </p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className={ style.type_nationality }
                >
                  { favorite.type === 'meal'
                    ? `${favorite.nationality} - ${favorite.category}`
                    : favorite.alcoholicOrNot}
                </p>

                {/* <button
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
                <span data-testid="msgLinkCopied">{linkMsg}</span> */}
                <div className={ style.buttons_conteiner }>
                  <ShareButton />
                  <button
                    type="button"
                    onClick={ handleDeslikeRecipe }
                    className={ style.btn_favorite }
                  >
                    <FontAwesomeIcon
                      className={ style.header_button_image }
                      icon={ solid('heart') }
                      size="3x"
                    />
                  </button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
