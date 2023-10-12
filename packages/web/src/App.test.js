import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Input first number link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Input first number/i);
  expect(linkElement).toBeInTheDocument();
});
