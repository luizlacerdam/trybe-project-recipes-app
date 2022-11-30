import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <Header title="Meals" searchButton />
      <Footer />
      <p>Meals</p>
    </div>
  );
}

export default Meals;
