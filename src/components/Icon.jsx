import PropTypes from 'prop-types';
import React from 'react';
import {
  GiChickenOven, GiGoat, GiKnifeFork, GiPieSlice, GiSteak, GiCoffeeCup,
} from 'react-icons/gi';
import { MdOutlineFreeBreakfast, MdFastfood } from 'react-icons/md';
import { FaGlassMartiniAlt, FaWineGlassAlt, FaCocktail } from 'react-icons/fa';
import { BsCupStraw } from 'react-icons/bs';
import { IoIosBeer } from 'react-icons/io';
import style from '../style/Meals.module.css';

function Icon({ shape }) {
  if (shape === 'Beef') {
    return (
      <GiSteak size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Breakfast') {
    return (
      <MdOutlineFreeBreakfast size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Chicken') {
    return (
      <GiChickenOven size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Dessert') {
    return (
      <GiPieSlice size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Goat') {
    return (
      <GiGoat size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'AllMeals') {
    console.log(shape);
    return (
      <GiKnifeFork size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Ordinary Drink') {
    return (
      <FaWineGlassAlt size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Cocktail') {
    return (
      <FaCocktail size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Shake') {
    return (
      <BsCupStraw size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Other / Unknown') {
    return (
      <IoIosBeer size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'Cocoa') {
    return (
      <GiCoffeeCup size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'AllDrinks') {
    return (
      <FaGlassMartiniAlt size="30px" className={ style.categorie_button_icon } />
    );
  }
  if (shape === 'AllMealsDrinks') {
    return (
      <MdFastfood size="30px" className={ style.categorie_button_icon } />
    );
  }
}

Icon.propTypes = {
  shape: PropTypes.string.isRequired,
};

export default Icon;
