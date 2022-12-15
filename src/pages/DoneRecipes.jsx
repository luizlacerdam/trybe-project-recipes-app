import React, { useEffect, useState } from 'react';
// import copy from 'clipboard-copy';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';
import style from '../style/DoneRecipes.module.css';
import ShareButton from '../components/ShareButton';

function DoneRecipes() {
  // const [showMessage, setShowMessage] = useState(false);

  const [getDoneRecipes, setDoneRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);

  useEffect(() => {
    const recipes = localStorage.getItem('doneRecipes');
    const recipesParsed = JSON.parse(recipes);
    setDoneRecipes(recipesParsed);
    setRenderRecipes(recipesParsed);
  }, []);

  // function copyURL(id, type) {
  //   if (type === 'meal') {
  //     copy(`http://localhost:3000/meals/${id}`);
  //   } else {
  //     copy(`http://localhost:3000/drinks/${id}`);
  //   }
  //   if (showMessage) {
  //     setShowMessage(false);
  //   } else {
  //     setShowMessage(true);
  //   }
  // }

  return (
    <div className={ style.done_recipe_card }>
      <Header title="Done Recipes" searchButton={ false } />
      <div className={ style.container_buttons_filter }>
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
      </div>
      {renderRecipes && renderRecipes.map((recipe, index) => {
        const { id, type, nationality, category, name, image, doneDate, tags } = recipe;
        return (
          <div key={ id } className={ style.container_recipe_done }>
            <a
              href={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
              className={ style.link_thumb }
            >
              <img
                className={ style.image_card }
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt="recipe-thumb"
              />
            </a>
            <div className={ style.box_info_recipe_done }>
              <div>
                <a
                  data-testid={ `${index}-horizontal-name` }
                  href={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
                  className={ style.title }
                >
                  { name }
                </a>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className={ style.type_nationality }
                >
                  {type === 'drink' ? recipe.alcoholicOrNot : nationality}
                  {' '}
                  -
                  {' '}
                  {category}
                </p>
              </div>
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className={ style.date_done }
              >
                { doneDate }
              </p>
              <div className={ style.box_tag }>
                {tags.length > 0 && tags.filter((_, indexF) => indexF < 2)
                  .map((tag, indexM) => (
                    <p
                      key={ indexM }
                      data-testid={ `0-${tag}-horizontal-tag` }
                      className={ style.tag }
                    >
                      { tag }
                    </p>)) }
              </div>
              <ShareButton />
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
