import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokemon component suite tests', () => {
  const pikachu = pokemons[0];

  it('shoud render the respective pokemon info', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/6.0/i);
  });

  it('should render a button redirecting to pokemon details', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);

    const pokemonAnchorLink = screen.getByText(/more details/i);
    expect(pokemonAnchorLink).toBeInTheDocument();

    // Source:
    // https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library

    expect(pokemonAnchorLink.href).toBe('http://localhost/pokemons/25');
  });

  it('should render the respective pokemon image', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);

    // Source:
    // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src

    const pokemonImage = screen.getByAltText(/pikachu sprite/i);
    expect(pokemonImage.src).toContain(pikachu.image);
  });

  it('should render a favorite star and be marked as favorite when expected', () => {
    renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);

    const pokemonAnchorLink = screen.getByText(/more details/i);
    userEvent.click(pokemonAnchorLink);

    const favoritePokemonInput = screen.getByRole('checkbox');
    userEvent.click(favoritePokemonInput);

    const favoritePokemon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoritePokemon.src).toContain('/star-icon.svg');
  });
});
