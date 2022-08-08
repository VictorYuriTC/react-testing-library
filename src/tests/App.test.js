import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

// João Andrade Jr. helped me, since for some reason
// { pathname } was not working when destructured

describe('1. App suite tests', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /home/i });
  const aboutLink = screen.getByRole('link', { name: /about/i });
  const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });

  test('home, about and favoritePokemons texts are in the document', () => {
    expect(homeLink).toHaveTextContent(/home/i);
    expect(aboutLink).toHaveTextContent(/about/i);
    expect(favoritesLink).toHaveTextContent(/favorite pokémons/i);
  });

  test('user is redirect to Home when clicking on link', () => {
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    userEvent.click(homeLink);

    expect(pathname).toBe('/');
  });

  test('user is redirect to about when clicking on link', () => {
    userEvent.click(aboutLink);
    history.push('/about');
    expect(history.location.pathname).toBe('/about');
  });

  test('user is redirect to favorites when clicking on link', () => {
    userEvent.click(favoritesLink);
    history.push('/favorites');
    expect(history.location.pathname).toBe('/favorites');
  });
});
