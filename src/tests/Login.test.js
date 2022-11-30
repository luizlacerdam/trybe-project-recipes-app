import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailInput = 'email-input';
const passInput = 'password-input';
const buttonId = 'login-submit-btn';
const email = 'aluno@trybe.com';
const password = '1234567';
describe('Testa a página de Login.', () => {
  describe('1. Testa input de email.', () => {
    test('1.1. Testa se o input de email está renderizando.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId(emailInput)).toBeInTheDocument();
    });
    test('1.2. Testa se o input de email pode se escrito.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId(emailInput)).toBeInTheDocument();
      userEvent.type(screen.getByTestId(emailInput), email);
    });
  });
  describe('2. Testa input de password.', () => {
    test('2.1. Testa se o input de password está renderizando.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId(passInput)).toBeInTheDocument();
    });
    test('2.2. Testa se o input de password pode se escrito.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId(passInput)).toBeInTheDocument();
      userEvent.type(screen.getByTestId(passInput), password);
    });
  });
  describe('3. Testa button enter.', () => {
    test('3.1. Testa se o button está renderizando.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId(buttonId)).toBeInTheDocument();
      expect(screen.getByTestId(buttonId)).toHaveTextContent('Enter');
      expect(screen.getByTestId(buttonId)).toBeDisabled();
    });
    test('3.2. Testa se o button não esta disabled.', () => {
      renderWithRouterAndRedux(<Login />);
      userEvent.type(screen.getByTestId(emailInput), email);
      expect(screen.getByTestId(buttonId)).toBeDisabled();
      userEvent.type(screen.getByTestId(passInput), password);
      expect(screen.getByTestId(buttonId)).toBeEnabled();
    });
  });
  describe('4. Testa funcionalidade de login.', () => {
    test('4.1. Testa se o button está renderizando.', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      userEvent.type(screen.getByTestId(emailInput), email);
      expect(screen.getByTestId(buttonId)).toBeDisabled();
      userEvent.type(screen.getByTestId(passInput), password);
      expect(screen.getByTestId(buttonId)).toBeEnabled();
      console.log(screen.getByTestId(buttonId));
      userEvent.click(screen.getByTestId(buttonId));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals');
    });
  });
});
