import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';

describe('about page', () => {
  const { history } = renderWithRouter(<About />);
  const img = screen.getByAltText(/pokédex/i);

  test('if it contains a heading h2 with the expected text', () => {
    const header = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(header).toBeInTheDocument();
  });

  test('if there is the expected image in the page', () => {
    console.log(history.location.pathname);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toContain(URL);
  });
});
