import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa o component Profile', () => {
  it('Checa o botão do DoneRecipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    window.localStorage.setItem('user', JSON.stringify({ email: 'mathgaspary@gmail.com' }));

    act(() => {
      history.push('/profile');
    });

    const doneRecipeButton = screen.getByTestId('profile-done-btn');

    expect(doneRecipeButton).toBeInTheDocument();

    userEvent.click(doneRecipeButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('Checa o botão do FavoriteRecipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    window.localStorage.setItem('user', JSON.stringify({ email: 'matheus@matheus.com' }));

    act(() => {
      history.push('/profile');
    });

    const favButton = screen.getByTestId('profile-favorite-btn');

    expect(favButton).toBeInTheDocument();

    userEvent.click(favButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Checa o botão do Logout', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    window.localStorage.setItem('user', JSON.stringify({ email: 'tiago@gmail.com' }));

    act(() => {
      history.push('/profile');
    });

    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
