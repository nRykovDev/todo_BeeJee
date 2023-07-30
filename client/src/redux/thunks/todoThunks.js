import { selectPage } from '../slices/todos.slice';

export const getTodosThunk =
  (page = 1, sortBy = 'updatedAt', direction = 'desc') =>
  (dispatch) => {
    fetch(
      `http://localhost:3000/todo?page=${page}&sortBy=${sortBy}&direction=${direction}`
    )
      .then((response) => response.json())
      .then((result) => dispatch(selectPage({ page, selectedTodos: result })));
  };
