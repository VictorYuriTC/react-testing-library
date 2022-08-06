import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Pokedex page suite tests', () => {
  it('should have a h2 with the expected text', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2 });
    const h2ExpectedText = /encountered pokémons/i;
    expect(h2).toHaveTextContent(h2ExpectedText);
  });

  it('should show the next pokemon after clicking on próximo pokémon', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByText(/próximo pokémon/i);
    const firstPokemon = screen.getByText(/pikachu/i);

    expect(nextPokemonButton).toBeInTheDocument();
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const nextPokemon = screen.getByText(/charmander/i);

    expect(nextPokemon).toBeInTheDocument();

    const psychicButton = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(psychicButton);
    const firstDifferentTypePokemon = screen.getByText(/alakazam/i);
    const firstDifferentTypePokemonType = screen.getByTestId('pokemon-type');

    expect(firstDifferentTypePokemon).toBeInTheDocument();
    expect(psychicButton).toHaveTextContent(/psychic/i);
    expect(firstDifferentTypePokemonType).toHaveTextContent(/psychic/i);

    userEvent.click(nextPokemonButton);
    const nextDifferentTypePokemon = screen.getByText(/mew/i);

    expect(nextDifferentTypePokemon);

    userEvent.click(nextPokemonButton);

    expect(firstDifferentTypePokemon);

    const allTypesOfPokemonButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allTypesOfPokemonButton);

    expect(firstPokemon).toBeInTheDocument();
  });

  it('should show the first pokémon after clicking on next pokemon when expected', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);

    const lastPokemon = screen.getByText(/dragonair/i);

    expect(lastPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const firstPokemon = screen.getByText(/pikachu/i);

    expect(firstPokemon).toBeInTheDocument();
  });

  it('should have type filter buttons on screen', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Fire' });

    userEvent.click(button);
  });

  it('should match pokemon type and pokemon type button texts', () => {
    renderWithRouter(<App />);
    const psychicButton = screen.getAllByTestId('pokemon-type-button')
      .find((typeButton) => typeButton.innerHTML.includes('Psychic'));
    userEvent.click(psychicButton);

    const firstPsychicPokemonType = screen.getByTestId('pokemon-type');
    expect(psychicButton).toHaveTextContent(/psychic/i);
    expect(firstPsychicPokemonType).toHaveTextContent(/psychic/i);
  });

  it('should have a button to reset filtering', () => {
    renderWithRouter(<App />);
    const button = screen.getByText(/all/i);

    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});
