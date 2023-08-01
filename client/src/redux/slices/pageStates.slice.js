import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'createdAt',
  direction: 'desc',
  error: '',
};

const pageSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSortBy, setDirection, setError } = pageSlice.actions;

export const selectPageData = (state) => state.persistedReducer.pageReducer;

export default pageSlice.reducer;
