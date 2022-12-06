import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" searchButton />
      <p>Meals</p>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
