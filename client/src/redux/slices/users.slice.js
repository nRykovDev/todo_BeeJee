import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    unsetUser: (state) => {
      state.username = '';
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export const selectUser = (state) => state.userSlice.username;

export default userSlice.reducer;
