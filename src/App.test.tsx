import { act, render, screen } from '@testing-library/react';
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
  screen.debug();
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
  // An update to ListTable inside a test was not wrapped in act(...).
  await act(async () => {
    render(<ListTable />);
    await new Promise((r) => setTimeout(r, 5000));
  })
  const el = screen.getByText(/Nom del Bot/i);
  expect(el).toBeTruthy();
});
