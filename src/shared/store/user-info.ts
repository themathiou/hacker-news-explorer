import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface UserInfoState {
  username: string | null;
}

const initialState: UserInfoState = {
  username: null
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUsername: state => {
      state.username = null;
    }
  }
});

export const UserInfoActions = userInfoSlice.actions;

// Selectors
export const selectUsername = (state: RootState) => state.userInfo.username;

export default userInfoSlice.reducer;
