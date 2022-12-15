import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import style from '../style/Meals.module.css';

function Footer() {
  return (
    <footer className={ style.footer } data-testid="footer">
      <Link to="/drinks">
        <Icon shape="AllDrinks" />
      </Link>
      <Link to="/meals">
        <Icon shape="AllMeals" />
      </Link>
    </footer>
  );
}

export default Footer;
