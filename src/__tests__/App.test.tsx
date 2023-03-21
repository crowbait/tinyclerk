import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

// mock for react-resize-observer implementation of recharts
// https://github.com/recharts/recharts/issues/3029
global.ResizeObserver = jest.fn().mockImplementation(() => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn()
  }
});
describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
