import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const arrabiata = 'Spicy Arrabiata Penne';
const recipeTitle = 'recipe-title';
const arrabiataUrl = '/meals/52977';
const finishRecipeButton = 'finish-recipe-btn';
const startRecipeButton = 'start-recipe-btn';
const ggUrl = '/drinks/15997';
const firstName = '0-horizontal-name';

describe('Testa a página de Receitas em Progresso e seus componentes', () => {
  describe('1. Testa uma refeição em progresso.', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('1.1. Testa iniciar uma receita.', async () => {
      const { history } = renderWithRouterAndRedux(
        <App />,
        { initialEntries: [arrabiataUrl] },
      );
      const { location: { pathname } } = history;
      expect(pathname).toBe(arrabiataUrl);
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent(arrabiata);
      expect(await screen.findByTestId(startRecipeButton)).toHaveTextContent('Start Recipe');
      userEvent.click(screen.getByTestId(startRecipeButton));
      expect(history.location.pathname).toBe('/meals/52977/in-progress');
      act(() => history.push(arrabiataUrl));
      expect(await screen.findByTestId(startRecipeButton)).toHaveTextContent('Continue Recipe');
      userEvent.click(screen.getByTestId(startRecipeButton));
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent(arrabiata);
      expect(await screen.findByTestId(finishRecipeButton)).toBeDisabled();
      const recipeCheckbox = await screen.findAllByTestId(/-ingredient-step/);
      expect(recipeCheckbox).toHaveLength(8);
      recipeCheckbox.forEach((button) => userEvent.click(button));
      expect(await screen.findByTestId(finishRecipeButton)).not.toBeDisabled();
      userEvent.click(screen.getByTestId(finishRecipeButton));

      expect(await screen.findByTestId('page-title')).toBeInTheDocument();
      expect(await screen.findByTestId(firstName)).toBeInTheDocument();
      expect(await screen.findByTestId(firstName)).toHaveTextContent(arrabiata);
    });
  });
  describe('2. Testa uma refeição em progresso.', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetch);
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    test('2.1. Testa iniciar uma receita.', async () => {
      const { history } = renderWithRouterAndRedux(
        <App />,
        { initialEntries: [ggUrl] },
      );
      const { location: { pathname } } = history;
      expect(pathname).toBe(ggUrl);
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent('GG');
      // expect(await screen.findByTestId(startRecipeButton)).toHaveTextContent('Start Recipe');
      userEvent.click(screen.getByTestId(startRecipeButton));
      expect(history.location.pathname).toBe('/drinks/15997/in-progress');
      act(() => history.push(ggUrl));
      // expect(await screen.findByTestId(startRecipeButton)).toHaveTextContent('Continue Recipe');
      userEvent.click(screen.getByTestId(startRecipeButton));
      expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
      expect(await screen.findByTestId(recipeTitle)).toHaveTextContent('GG');
      expect(await screen.findByTestId(finishRecipeButton)).toBeDisabled();
      const recipeCheckbox = await screen.findAllByTestId(/-ingredient-step/);
      expect(recipeCheckbox).toHaveLength(3);
      userEvent.click(await screen.findByTestId('0-ingredient-step'));
      userEvent.click(await screen.findByTestId('0-ingredient-step'));
      recipeCheckbox.forEach((button) => userEvent.click(button));
      expect(await screen.findByTestId(finishRecipeButton)).not.toBeDisabled();
      userEvent.click(screen.getByTestId(finishRecipeButton));

      expect(await screen.findByTestId('page-title')).toBeInTheDocument();
      expect(await screen.findByTestId(firstName)).toBeInTheDocument();
      expect(await screen.findByTestId(firstName)).toHaveTextContent('GG');
    });
  });
});
