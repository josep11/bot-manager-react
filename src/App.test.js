import { render, screen } from '@testing-library/react';
import App from './App';
import { getBotNames } from './components/api_wrapper';

test('renders Nom del Bot header', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/Milanuncios/i);
  // expect(linkElement).toBeInTheDocument();
});

test('should import botNames', async () => {
  const botNames = await getBotNames();
  expect(botNames).not.toBe(undefined);
  expect(botNames).not.toBe(null);
  expect(Array.isArray(botNames)).toBe(true);
  expect(botNames.length).toBeGreaterThan(0);
});
