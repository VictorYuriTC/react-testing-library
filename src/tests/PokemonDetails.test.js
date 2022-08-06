import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('PokemonDatails suite tests', () => {
  const ekans = pokemons.find(({ name }) => name === 'Ekans');

  it('should render the respective pokemon name', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);

    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    const ekansDetails = screen.getByText(/ekans details/i);
    expect(ekansDetails).toBeInTheDocument();
  });

  it('should not render a anchor link redirecting to the selected pokémon', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);

    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    expect(pokemonDetails).not.toBeInTheDocument();
  });

  it('should render an h2 with the expect text', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);

    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    const h2 = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(h2).toBeInTheDocument();
  });

  it('should render a div section which contains selected pokemon details', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);

    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonAverageWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toHaveTextContent(ekans.name);
    expect(pokemonType).toHaveTextContent(ekans.type);
    expect(pokemonAverageWeight).toHaveTextContent(ekans.averageWeight.value);
  });

  it('should render a map containing pokemon locations', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);

    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Ekans',
    });

    const ekansLocationName = ekans
      .foundAt
      .find((locationInfo) => locationInfo)
      .location;
    const ekansLocationImage = ekans
      .foundAt
      .find((locationInfo) => locationInfo)
      .map;

    const pokemonLocationName = screen.getByText(/Goldenrod Game Corner/i);
    const pokemonLocationImage = screen.getByAltText(/ekans location/i);

    expect(h2).toBeInTheDocument();
    expect(pokemonLocationName).toHaveTextContent(`${ekansLocationName}`);
    expect(pokemonLocationImage.src).toContain(ekansLocationImage);
  });

  it('should allow users to mark the selected pokemon as favorite', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);

    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    const favoritePokemonCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoritePokemonCheckbox);

    expect(favoritePokemonCheckbox).toBeInTheDocument();
    expect(favoritePokemonCheckbox).toBeChecked();

    userEvent.click(favoritePokemonCheckbox);
    expect(favoritePokemonCheckbox).not.toBeChecked();
  });

  it('shuld render the respective pokemon summary', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonButton);

    const pokemonDetails = screen.getByText(/more details/i);
    userEvent.click(pokemonDetails);

    const pokemonSummary = screen.getByText(/it can freely detach/i);
    const { summary } = ekans;

    expect(pokemonSummary).toHaveTextContent(summary);
  });
});
