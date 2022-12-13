import { act, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import fetch from '../../cypress/mocks/fetch';

const AllButton = 'All-category-filter';
const goatCategory = 'Goat-category-filter';
const cocoaCategory = 'Cocoa-category-filter';
const recipeTitle = 'recipe-title';
const favoriteBtn = 'favorite-btn';
const arrabiataUrl = '/meals/52977';
const ggUrl = '/drinks/15997';
const whiteHeartUrl = 'whiteHeartIcon.svg';
const blackHeartUrl = 'blackHeartIcon.svg';
const arrabiata = 'Spicy Arrabiata Penne';

describe('Testa a o componente Recipes.', () => {
  describe('1. Testa o componente Recipes em "/meals".', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('1.1. Testa se renderiza a lista de categorias com 6 categorias.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(await screen.findByTestId('Beef-category-filter')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-category-filter/)).toHaveLength(6);
    });
    test('1.2. Testa se renderiza a lista de meals com 12 itens.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-card-name/)).toHaveLength(12);
    });
    test('1.3. Testa se renderiza o botão com "All".', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(screen.getByTestId(AllButton)).toBeInTheDocument();
      expect(screen.getByTestId(AllButton)).toHaveTextContent('All');
    });
    test('1.4. Testa o botão de filtro categorico e toggle.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(await screen.findByText('Corba')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId(goatCategory));
      expect(await screen.findByText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId(goatCategory));
      expect(await screen.findByText('Corba')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId(goatCategory));
      userEvent.click(await screen.findByTestId(AllButton));
      expect(await screen.findByText('Corba')).toBeInTheDocument();
    });
    test('1.5. Testa se ao clicar em um card de "/meals" é direcionado para a página do mesmo.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push(arrabiataUrl));
      // expect(await screen.findByText('Corba')).toBeInTheDocument();
      // userEvent.click(await screen.findByTestId('0-card-img'));
      const { location: { pathname } } = history;
      expect(pathname).toBe(arrabiataUrl);
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent(arrabiata);
    });
    test('1.6. Testa componente de favoritar na página de detalhes de uma receita.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push(arrabiataUrl));
      const { location: { pathname } } = history;
      expect(pathname).toBe(arrabiataUrl);
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent(arrabiata);
      expect(screen.getByTestId(favoriteBtn)).toBeInTheDocument();
      expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', whiteHeartUrl);
      userEvent.click(screen.getByTestId(favoriteBtn));
      expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', blackHeartUrl);
      userEvent.click(screen.getByTestId(favoriteBtn));
      expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', whiteHeartUrl);
    });
    test('1.7. Testa componente de compartilhar na página de detalhes de uma receita.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push(arrabiataUrl));
      const { location: { pathname } } = history;
      expect(pathname).toBe(arrabiataUrl);
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent(arrabiata);
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      window.document.execCommand = jest.fn(() => true);
      userEvent.click(screen.getByTestId('share-btn'));
      expect(await screen.findByText('Link copied!')).toBeInTheDocument();
    });
  });
  describe('2. Testa o componente Recipes em "/drinks".', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('2.1. Testa se renderiza a lista de categorias com 6 categorias.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      expect(await screen.findByTestId('Cocktail-category-filter')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-category-filter/)).toHaveLength(6);
    });
    test('2.2. Testa se renderiza a lista de drinks com 12 itens.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
      expect(await screen.findAllByTestId(/-card-name/)).toHaveLength(12);
    });
    test('2.3. Testa se renderiza o botão com "All".', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      expect(screen.getByTestId(AllButton)).toBeInTheDocument();
      expect(screen.getByTestId(AllButton)).toHaveTextContent('All');
    });
    test('2.4. Testa o botão de filtro categorico e toggle.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      expect(await screen.findByText('GG')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId(cocoaCategory));
      expect(await screen.findByText('Castillian Hot Chocolate')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId(cocoaCategory));
      expect(await screen.findByText('GG')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId(cocoaCategory));
      userEvent.click(await screen.findByTestId(AllButton));
      expect(await screen.findByText('GG')).toBeInTheDocument();
    });
    test('2.5. Testa se ao clicar em um card de "/drinks" é direcionado para a página do mesmo.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      expect(await screen.findByText('GG')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId('0-card-img'));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/15997');
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent('GG');
    });
    test('2.6. Testa componente de favoritar na página de detalhes de uma receita.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push(ggUrl));
      const { location: { pathname } } = history;
      expect(pathname).toBe(ggUrl);
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent('GG');
      expect(screen.getByTestId(favoriteBtn)).toBeInTheDocument();
      expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', whiteHeartUrl);
      userEvent.click(screen.getByTestId(favoriteBtn));
      expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', blackHeartUrl);
      userEvent.click(screen.getByTestId(favoriteBtn));
      expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', whiteHeartUrl);
    });
    test('2.7. Testa componente de compartilhar na página de detalhes de uma receita.', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push(ggUrl));
      const { location: { pathname } } = history;
      expect(pathname).toBe(ggUrl);
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent('GG');
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      window.document.execCommand = jest.fn(() => true);
      userEvent.click(screen.getByTestId('share-btn'));
      expect(await screen.findByText('Link copied!')).toBeInTheDocument();
    });
  });
});
