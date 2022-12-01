import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import Footer from '../components/Footer';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa componente Footer', () => {
  it('', () => {
    renderWithRouter(
      <Footer />,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);
    waitFor(() => expect(pathname).toBe('/meals'));
  });
});
