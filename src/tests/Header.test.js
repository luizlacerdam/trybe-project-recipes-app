import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const profileButton = 'profile-top-btn';
const searchTopButton = 'search-top-btn';
const searchInput = 'search-input';

describe('Testa o componente Header.', () => {
  describe('1. Testa o elemento "profile".', () => {
    test('1.1. Testa se o elemento está sendo renderizado.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(screen.getByTestId(profileButton)).toBeInTheDocument();
    });
    test('1.2. Testa se ao clicar no elemento é renderizado para "/profile".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      userEvent.click(screen.getByTestId(profileButton));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/profile');
    });
  });
  describe('2. Testa o elemento "search".', () => {
    test('2.1. Testa se o elemento está sendo renderizado.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(screen.getByTestId(searchTopButton)).toBeInTheDocument();
    });
    test('2.2. Testa se ao clicar no elemento a barra de busca deve aparecer e é digitável.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
      userEvent.click(screen.getByTestId(searchTopButton));
      expect(screen.getByTestId(searchInput)).toBeInTheDocument();
      userEvent.type(screen.getByTestId(searchInput), 'bolo de cenoura');
    });
  });
  describe('3. Testa o elemento "page-title".', () => {
    test('3.1. Testa se o elemento está sendo renderizado e tem o mesmo nome da página.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => history.push('/meals'));
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
    });
  });
});
