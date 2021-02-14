import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders version label', () => {
  render(<App />);
  const labelElement = screen.getByText('version:');
  expect(labelElement).toBeInTheDocument();
});
