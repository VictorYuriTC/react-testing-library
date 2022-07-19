import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import { Button } from '../components';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Pokedex page suite tests', () => {
  const pikachu = pokemons[0];
  const { history } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ pikachu.id }
  />);
  const button = screen.getByRole('button', { name: /próximo pokémon/i });
  const pokemonName = screen.getByTestId('pokemon-name');

  test('it contains a h2 with the expected text', () => {
    const message = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons' });
    expect(message).toBeInTheDocument();
  });

  test('it shows the next pokemon on clicking on button', () => {
    userEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  test('it shows the first pokemon clicking on button when last pokemon is shown', () => {
  });
});

/*   global.fetch = jest.fn()
    .mockResolvedValue({ json: jest.fn()
      .mockResolvedValue({
        id: 25,
      }) }); */
