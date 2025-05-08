import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, vi } from 'vitest';
import App from './App';
import { getBotNames } from './components/apiWrapper';
import ListTable from './components/list';

// Cleanup after each test
afterEach(() => {
  cleanup();
  // Clear any pending timers
  vi.clearAllTimers();
});

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
}, 10000);

test('renders data from xhr requests', async () => {
  render(<ListTable />);
  
  // Wait for the header text to appear with a timeout
  const headerElement = await screen.findByText(/Nom del Bot/i, {}, { timeout: 5000 });
  expect(headerElement).toBeInTheDocument();

  // Wait for the AJAX data to appear with a timeout
  const botElement = await screen.findByText(/Milanuncios/i, {}, { timeout: 5000 });
  expect(botElement).toBeInTheDocument();
}, 15000);
