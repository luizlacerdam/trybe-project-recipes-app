import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" searchButton />
      <p>Drinks</p>
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
