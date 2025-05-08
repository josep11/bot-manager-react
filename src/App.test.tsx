import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import { getBotNames } from './components/apiWrapper';
import ListTable from './components/list';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(),
// }));

// jest.setTimeout(10000);

test('renders Nom del Bot header', () => {
  render(<App />);
  const el = screen.getByText(/Manager/i);
  expect(el).toBeTruthy();
});

test('should import botNames', async () => {
  const botNames = await getBotNames();
  expect(botNames).not.toBe(undefined);
  expect(botNames).not.toBe(null);
  expect(Array.isArray(botNames)).toBe(true);
  expect(botNames.length).toBeGreaterThan(0);
});


test('renders data from xhr requests', async () => {
  render(<ListTable />);
  
  // Wait for the header text to appear
  const headerElement = await screen.findByText(/Nom del Bot/i);
  expect(headerElement).toBeInTheDocument();

  // Wait for the AJAX data to appear
  const botElement = await screen.findByText(/Milanuncios/i);
  expect(botElement).toBeInTheDocument();
}, 10 * 1000);
