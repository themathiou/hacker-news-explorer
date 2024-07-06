import { configureStore } from '@reduxjs/toolkit';
import hnReducer from './hacker-news';
import userInfoReducer from './user-info';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    hackernews: hnReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the sstore itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
