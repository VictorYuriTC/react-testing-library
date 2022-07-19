import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';

describe('3. FavoritePokemons page suite tests', () => {
  renderWithRouter(<FavoritePokemons />);
  test('if "No favorite pokemon found" message is shown', () => {
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
});
