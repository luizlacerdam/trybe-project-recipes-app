import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../style/DoneRecipes.css';

function DoneRecipes() {
  const [showMessage, setShowMessage] = useState(false);

  const [getDoneRecipes, setDoneRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);

  useEffect(() => {
    const recipes = localStorage.getItem('doneRecipes');
    const recipesParsed = JSON.parse(recipes);
    setDoneRecipes(recipesParsed);
    setRenderRecipes(recipesParsed);
  }, []);

  function copyURL(id, type) {
    if (type === 'meal') {
      copy(`http://localhost:3000/meals/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    if (showMessage) {
      setShowMessage(false);
    } else {
      setShowMessage(true);
    }
  }

  return (
    <div className="done-recipe-card">
      <Header title="Done Recipes" searchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setRenderRecipes(getDoneRecipes) }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => setRenderRecipes(getDoneRecipes
          .filter((recipe) => recipe.type === 'meal')) }
      >
        Meals

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setRenderRecipes(getDoneRecipes
          .filter((recipe) => recipe.type === 'drink')) }
      >
        Drinks

      </button>
      {renderRecipes && renderRecipes.map((recipe, index) => {
        const { id, type, nationality, category, name, image, doneDate, tags } = recipe;
        return (
          <div key={ id }>
            <a href={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }>
              <img
                className="image-card"
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt="recipe-thumb"
              />

            </a>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {type === 'drink' ? recipe.alcoholicOrNot : nationality}
              {' '}
              -
              {' '}
              {category}
            </p>
            <a
              data-testid={ `${index}-horizontal-name` }
              href={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
            >
              { name }
            </a>
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              type="image"
              src={ shareIcon }
              alt="share-button"
              onClick={ () => copyURL(id, type) }
            />
            {showMessage && 'Link copied!'}
            {tags.length > 0 && tags.filter((_, indexF) => indexF < 2)
              .map((tag, indexM) => (
                <p
                  key={ indexM }
                  data-testid={ `0-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>)) }

          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
