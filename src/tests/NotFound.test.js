import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('NotFound page suite tests', () => {
  renderWithRouter(<NotFound />);
  const image = screen
    .getByAltText(/Pikachu crying because the page requested was not found/i);
  test('if it contains a h2 with the expected text', () => {
    const HEADER = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(HEADER).toBeInTheDocument();
  });
  test('if the expected image is rendered at the page', () => {
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toContain(URL);
  });
});
