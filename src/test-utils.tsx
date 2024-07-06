import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import hnReducer from './shared/store/hacker-news';

interface RenderOptions {
  initialState?: any;
  store?: Store;
}

const renderWithProviders = (
  ui: ReactNode,
  {
    initialState,
    store = configureStore({ reducer: hnReducer, preloadedState: initialState }),
    ...renderOptions
  }: RenderOptions = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>, renderOptions);
};

export default renderWithProviders;
