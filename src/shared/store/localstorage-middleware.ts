import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { userInfoSlice } from './user-info';
import { hackerNewsSlice } from './hacker-news';
import { RootState } from '.';

const localStorageMiddleware: Middleware = (store: MiddlewareAPI<Dispatch, RootState>) => next => action => {
  const { setUsername, clearUsername } = userInfoSlice.actions;
  const { addSavedStory, deleteSavedStory, clearSavedStories } = hackerNewsSlice.actions;

  const state = store.getState();
  const result = next(action);

  switch (true) {
    case addSavedStory.match(action): {
      const savedStoriesInstance = [...state.hackernews.savedStories];

      if (savedStoriesInstance.find(story => story.objectID === action.payload.objectID)) return;
      savedStoriesInstance.push(action.payload);
      localStorage.setItem('savedStories', JSON.stringify(savedStoriesInstance));
      break;
    }
    case deleteSavedStory.match(action): {
      const savedStoriesInstance = [...state.hackernews.savedStories].filter(
        story => story.objectID !== action.payload
      );
      localStorage.setItem('savedStories', JSON.stringify(savedStoriesInstance));
      break;
    }
    case clearSavedStories.match(action):
      localStorage.removeItem('savedStories');
      break;
    case setUsername.match(action):
      localStorage.setItem('username', action.payload);
      break;
    case clearUsername.match(action):
      localStorage.removeItem('username');
      break;
    default:
      break;
  }

  return result;
};

export default localStorageMiddleware;
