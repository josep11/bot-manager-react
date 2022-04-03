import { act, render, screen } from '@testing-library/react';
import App from './App';
import ListTable from './components/list';
import { getBotNames } from './components/api_wrapper';

// jest.setTimeout(20000);

test('renders Nom del Bot header', () => {
  render(<App />);
  const el = screen.getByText(/Manager/i);
  expect(el).toBeInTheDocument();
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
    // await new Promise((r) => setTimeout(r, 5000));

  })
  const el = screen.getByText(/Nom del Bot/i);
  expect(el).toBeInTheDocument();
  // const el2 = screen.getByText(/anuncios/i);
  // expect(el2).toBeInTheDocument();
});
