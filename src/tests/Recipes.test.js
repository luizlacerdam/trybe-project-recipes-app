import { act, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import fetch from '../../cypress/mocks/fetch';

describe('Testa a o componente Recipes.', () => {
  describe('1. Testa o componente Recipes em "/meals"', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('1.1. Testa se renderiza a lista de categorias com 5 categorias.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(await screen.findByTestId('Beef-category-filter')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-category-filter/)).toHaveLength(5);
    });
    test('1.2. Testa se renderiza a lista de meals com 12 itens.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-card-name/)).toHaveLength(12);
    });
  });
  describe('2. Testa o componente Recipes em "/drinks"', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('2.1. Testa se renderiza a lista de categorias com 5 categorias.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      expect(await screen.findByTestId('Cocktail-category-filter')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-category-filter/)).toHaveLength(5);
    });
    test('1.2. Testa se renderiza a lista de drinks com 12 itens.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-card-name/)).toHaveLength(12);
    });
  });
});
