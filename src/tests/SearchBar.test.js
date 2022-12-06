import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import fetch from '../../cypress/mocks/fetch';

const searchTopButton = 'search-top-btn';
const searchInput = 'search-input';
const radioIngredient = 'ingredient-search-radio';
const searchButton = 'exec-search-btn';
const nameSearchRadio = 'name-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';
const recipeDetails = 'Recipes Details';

describe('Testa o componente SearchBar.', () => {
  describe('1. Testa os radios-buttons.', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('1.1. Testa a renderização dos radios-buttons.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      expect(screen.getByTestId(radioIngredient)).toBeInTheDocument();
      expect(screen.getByTestId(nameSearchRadio)).toBeInTheDocument();
      expect(screen.getByTestId(firstLetterSearchRadio)).toBeInTheDocument();
    });
  });
  describe('2. Testa o search button.', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('2.1. Testa a renderização do search button.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      expect(screen.getByTestId(searchButton)).toBeInTheDocument();
    });
  });
  describe('3. Testa a busca em "/meals".', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
      jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('3.1. Testa a busca por "Ingredient" "Chicken".', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(radioIngredient));
      userEvent.type(screen.getByTestId(searchInput), 'Chicken');
      userEvent.click(screen.getByTestId(searchButton));
      expect(await screen.findByText('Brown Stew Chicken')).toBeInTheDocument();
    });
    test('3.2. Testa a busca por "Name" "Arrabiata".', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(nameSearchRadio));
      userEvent.type(screen.getByTestId(searchInput), 'Arrabiata');
      userEvent.click(screen.getByTestId(searchButton));
      expect(await screen.findByText(recipeDetails)).toBeInTheDocument();
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/52771');
    });
    test('3.3. Testa a busca por "First Letter" "a".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(firstLetterSearchRadio));
      userEvent.type(screen.getByTestId(searchInput), 'a');
      userEvent.click(screen.getByTestId(searchButton));
    });
    test('3.4. Testa a busca por "First Letter" "aa".', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(firstLetterSearchRadio));
      userEvent.type(screen.getByTestId(searchInput), 'aa');
      userEvent.click(screen.getByTestId(searchButton));
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  describe('4. Testa a busca em "/drinks".', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
      jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('4.1. Testa a busca por "Ingredient" "Light rum".', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(radioIngredient));
      userEvent.type(screen.getByTestId(searchInput), 'Light rum');
      userEvent.click(screen.getByTestId(searchButton));
      expect(await screen.findByText('151 Florida Bushwacker')).toBeInTheDocument();
    });
    test('4.2. Testa a busca por "Name" "Aquamarine".', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(nameSearchRadio));
      userEvent.type(screen.getByTestId(searchInput), 'Aquamarine');
      userEvent.click(screen.getByTestId(searchButton));
      expect(await screen.findByText(recipeDetails)).toBeInTheDocument();
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/178319');
    });
    test('4.3. Testa a busca por "First Letter" "a".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(firstLetterSearchRadio));
      userEvent.type(screen.getByTestId(searchInput), 'a');
      userEvent.click(screen.getByTestId(searchButton));
    });
    test.skip('4.4. Testa a busca por "First Letter" "aa" se dispara global alert.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.click(screen.getByTestId(firstLetterSearchRadio));
      userEvent.type(screen.getByTestId(searchInput), 'aa');
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });
});
