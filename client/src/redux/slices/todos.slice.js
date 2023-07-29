import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  selectedTodos: [],
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    editTodo: (state, action) => {
      state.selectedTodos = state.selectedTodos.map((todo) => {
        if (todo.id === action.payload.id) return action.payload;
        return todo;
      });
    },
    prevPage: (state, action) => {
      state.page += 1;
      state.selectedTodos = action.payload;
    },
    nextPage: (state, action) => {
      state.page -= 1;
      state.selectedTodos = action.payload;
    },
    selectPage: (state, action) => {
      state = {
        page: action.payload.page,
        selectedTodos: action.payload.selectedTodos,
      };
    },
  },
});

export const { prevPage, nextPage, selectPage, editTodo } = todoSlice.actions;

export const selectPageData = (state) => state.todoSlice;

export default todoSlice.reducer;
