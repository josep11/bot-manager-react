import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nom del Bot header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Nom del Bot/i);
  expect(linkElement).toBeInTheDocument();
});
