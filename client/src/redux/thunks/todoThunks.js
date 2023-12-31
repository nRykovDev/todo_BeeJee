import { setError } from '../slices/pageStates.slice';
import { editTodo, selectPage } from '../slices/todos.slice';

export const getTodosThunk =
  (page = 1, sortBy = 'updatedAt', direction = 'desc') =>
  (dispatch) => {
    fetch(
      `https://bgtestserver.onrender.com/todo?page=${page}&sortBy=${sortBy}&direction=${direction}`
    )
      .then((response) => response.json())
      .then((result) => dispatch(selectPage({ page, selectedTodos: result })));
  };

export const updateStatusThunk = (todo) => (dispatch) => {
  fetch(`https://bgtestserver.onrender.com/todo/${todo.id}`, {
    method: 'PATCH',
  }).then((res) => {
    if (res.status === 403) {
      return dispatch(setError('Please authorize'));
    }
    dispatch(editTodo({ ...todo, status: !todo.status }));
  });
};
