import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//retrive nasa images
test('load nasa images', () => {
  const date = "2018-04-31"
  const expectedResult = []

  const actualResult = getData(date)
 
  expect(actualResult).toBe(expectedResult)
})
