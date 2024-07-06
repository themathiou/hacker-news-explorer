import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { Hit } from '../../models/hn-response.model';

interface HackerNewsState {
  savedStories: Hit[];
}

const initialState: HackerNewsState = {
  savedStories: []
};

export const hackerNewsSlice = createSlice({
  name: 'hackernews',
  initialState,
  reducers: {
    setSavedStories: (state, action: PayloadAction<Hit[]>) => {
      state.savedStories = action.payload;
    },
    addSavedStory: (state, action: PayloadAction<Hit>) => {
      if (state.savedStories.find(story => story.objectID === action.payload.objectID)) return;
      state.savedStories.push(action.payload);
    },
    deleteSavedStory: (state, action: PayloadAction<string>) => {
      state.savedStories = state.savedStories.filter(story => story.objectID !== action.payload);
    },
    clearSavedStories: state => {
      state.savedStories = [];
    }
  }
});

export const HackerNewsActions = hackerNewsSlice.actions;

// Selectors
export const selectSavedStories = (state: RootState) => state.hackernews.savedStories;

export default hackerNewsSlice.reducer;
