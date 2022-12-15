import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from '../style/CarouselRecommendations.module.css';

function CarouselRecommendations() {
  const [isMeal, setIsMeal] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  let recommendations = [];
  const listRecommendationsDrinks = useSelector(
    (globalState) => globalState.meals.recommendationsDrinks,
  );
  const listRecommendationsMeals = useSelector(
    (globalState) => globalState.drinks.recommendationsMeals,
  );

  useEffect(() => {
    if (pathname.includes('meals')) {
      setIsMeal(true);
    } else {
      setIsMeal(false);
    }
  }, []);

  if (pathname.includes('meals')) {
    recommendations = listRecommendationsDrinks;
  } else {
    recommendations = listRecommendationsMeals;
  }

  return (
    <div className={ style.container_carousel }>
      {recommendations.map((item, index) => (
        <div
          data-testid={ `${index}-recommendation-card` }
          key={ index }
          className={ style.box_carousel }
        >
          <div className={ style.box_item }>
            <img
              src={ isMeal ? item.strDrinkThumb : item.strMealThumb }
              alt={ isMeal ? item.strDrink : item.strMeal }
              className={ style.Thumb }
            />
            <p
              data-testid={ `${index}-recommendation-title` }
              className={ style.title_item }
            >
              { isMeal ? item.strDrink : item.strMeal }
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarouselRecommendations;
