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
  it('should show the next pokemon after clicking', () => {
    renderWithRouter(<App />);
    const button = screen.getByText(/próximo pokémon/i);

    expect(button).toBeInTheDocument();
  });
  it('should have type filter buttons on screen', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Fire' });

    userEvent.click(button);
  });
  it('should have a button to reset filtering', () => {
    renderWithRouter(<App />);
    const button = screen.getByText(/all/i);

    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});
