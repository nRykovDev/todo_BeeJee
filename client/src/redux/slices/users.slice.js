import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorized: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state) => {
      state.authorized = true;
    },
    unsetUser: (state) => {
      state.authorized = false;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export const selectUser = (state) => state.userReducer.authorized;

export default userSlice.reducer;
