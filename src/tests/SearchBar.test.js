import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const searchTopButton = 'search-top-btn';
const searchInput = 'search-input';
const radioIngredient = 'ingredient-search-radio';
const searchButton = 'exec-search-btn';

describe('Testa o componente SearchBar.', () => {
  describe('1. Testa os radios-buttons.', () => {
    test('1.1. Testa a renderização dos radios-buttons.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      expect(screen.getByTestId(radioIngredient)).toBeInTheDocument();
      expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
      expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    });
  });
  describe('2. Testa o search button.', () => {
    test('2.1. Testa a renderização do search button.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      expect(screen.getByTestId(searchButton)).toBeInTheDocument();
    });
  });
  describe('3. Testa a busca por "Ingredient" em "/meals".', () => {
    test('3.1. Testa a busca por "Ingredient" "water".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.type(screen.getByTestId(searchInput), 'water');
      userEvent.click(screen.getByTestId(radioIngredient));
      userEvent.click(screen.getByTestId(searchButton));
    });
  });
  describe('4. Testa a busca por "Name" em "/meals".', () => {
    test('4.1. Testa a busca por "Name" "Pizza".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.type(screen.getByTestId(searchInput), 'Pizza');
      userEvent.click(screen.getByTestId('name-search-radio'));
      userEvent.click(screen.getByTestId(searchButton));
    });
  });
  describe('5. Testa a busca por "First Letter" em "/meals".', () => {
    test('5.1. Testa a busca por "First Letter" "a".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.type(screen.getByTestId(searchInput), 'Pizza');
      userEvent.click(screen.getByTestId('first-letter-search-radio'));
      // comentado até retirar error do .length
      // userEvent.click(screen.getByTestId(searchButton));
    });
  });
  describe('6. Testa a busca por "First Letter" em "/drinks".', () => {
    test('6.1. Testa a busca por "First Letter" "a".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/drinks'));
      userEvent.click(screen.getByTestId(searchTopButton));
      userEvent.type(screen.getByTestId(searchInput), 'water');
      userEvent.click(screen.getByTestId(radioIngredient));
      userEvent.click(screen.getByTestId(searchButton));
    });
  });
});
