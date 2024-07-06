import { configureStore } from '@reduxjs/toolkit';
import hnReducer from './hacker-news';

export const store = configureStore({
  reducer: {
    hackernews: hnReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the sstore itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
