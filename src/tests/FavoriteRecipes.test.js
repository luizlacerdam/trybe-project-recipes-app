import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testes pagina de receitas favoritas.', () => {
  const favoriteRecipes = [
    {
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      name: 'Corba',
      image: 'https://www.themealdb.com//images//media//meals//58oia61564916529.jpg',
      doneDate: '05/12/2022',
      tags: ['soup'],
    },
    {
      id: '15288',
      type: 'drink',
      nationality: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: '252',
      image: 'https://www.thecocktaildb.com//images//media//drink//rtpxqw1468877562.jpg',
      doneDate: '05/12/2021',
      tags: [],
    }];

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('1) Verifica se a pagina de favoritos foi renderizada.', () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const titlePageFavorite = screen.getByTestId('page-title');
    expect(titlePageFavorite).toBeInTheDocument();
    const imgRecipeFavorite = screen.getByTestId('0-horizontal-image');
    expect(imgRecipeFavorite).toBeInTheDocument();
  });

  it('2) Verifica se ao clicar na foto da receita, é redirecionado para a pagina de detalhes.', () => {
    const { history } = renderWithRouterAndRedux(<FavoriteRecipes />);

    const imgRecipeFavorite = screen.getByTestId('0-horizontal-image');
    expect(imgRecipeFavorite).toBeInTheDocument();
    userEvent.click(imgRecipeFavorite);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('3) Verifica se ao clicar em compartilhar, o link da pagina de detalhes é copiado.', () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);

    window.document.execCommand = jest.fn(() => true);
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);
    const shareButton2 = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(shareButton2);
  });

  it('4) Verifica se ao clicar no filtro é listado apenas o que foi solicitado.', () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const btnFilterAll = screen.getByTestId('filter-by-all-btn');
    expect(btnFilterAll).toBeInTheDocument();
    const btnFilterMeals = screen.getByTestId('filter-by-meal-btn');
    expect(btnFilterMeals).toBeInTheDocument();
    const btnFilterDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(btnFilterDrinks).toBeInTheDocument();

    const firstRecipeFavorite = screen.getByTestId('0-horizontal-name');
    const secondRecipeFavorite = screen.getByTestId('1-horizontal-name');

    userEvent.click(btnFilterMeals);
    expect(firstRecipeFavorite.textContent).toBe('Corba');

    userEvent.click(btnFilterAll);
    expect(firstRecipeFavorite.textContent).toBe('Corba');
    expect(secondRecipeFavorite.textContent).toBe('252');

    userEvent.click(btnFilterDrinks);
    expect(firstRecipeFavorite.textContent).toBe('252');
  });

  it('5) Verifica se ao clicar em deslike, a receita e exluida do local storage.', () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const firstRecipeFavorite = screen.getByTestId('0-horizontal-name');
    expect(firstRecipeFavorite.textContent).toBe('Corba');

    const btnDeslike = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnDeslike).toBeInTheDocument();
    userEvent.click(btnDeslike);

    expect(firstRecipeFavorite.textContent).toBe('252');
  });
});
