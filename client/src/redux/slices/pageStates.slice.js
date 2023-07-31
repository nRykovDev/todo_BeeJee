import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'createdAt',
  direction: 'desc',
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
  },
});

export const { setSortBy, setDirection } = pageSlice.actions;

export const selectPageData = (state) => state.pageReducer;

export default pageSlice.reducer;
