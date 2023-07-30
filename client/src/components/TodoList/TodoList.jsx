import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodoData } from '../../redux/slices/todos.slice';
import { getTodosThunk } from '../../redux/thunks/todoThunks';
import { Todo } from './Todo';
import { useState } from 'react';
import { Form } from './Form';
import getPages from './helperFuncs';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodoData);
  const [todosMapped, setTodosMapped] = useState([]);
  const [pages, setPages] = useState([1]);
  const [pagesMapped, setPagesMapped] = useState([]);

  const handlePageChange = (e) => {
    dispatch(getTodosThunk(e.currentTarget.value));
  };

  const handlePageArrow = (direction) => {
    if (direction === 'prev') return dispatch(getTodosThunk(todos.page - 1));
    dispatch(getTodosThunk(todos.page + 1));
  };

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

  useEffect(() => {
    setTodosMapped(
      todos.selectedTodos.entries.map((todo) => (
        <Todo key={todo.id} task={todo}></Todo>
      ))
    );
    setPages([...getPages(Math.ceil(todos.selectedTodos.entriesCount / 3))]);
    setPagesMapped(
      pages.map((page) => (
        <option className="pageOption pageMenu" key={page} value={page}>
          {page}
        </option>
      ))
    );
  }, [todos]);

  return (
    <>
      <div className="container">
        {todosMapped}
        <Form page={todos.page} />
        <div className="pageContainer">
          <span onClick={() => handlePageArrow('prev')} className="pageArrow">
            {'<'}
          </span>
          <select
            onChange={handlePageChange}
            className="pageSelect pageMenu"
            name="page"
            value={todos.page}>
            {pagesMapped}
          </select>
          <span onClick={handlePageArrow} className="pageArrow">
            {'>'}
          </span>
        </div>
      </div>
    </>
  );
};
