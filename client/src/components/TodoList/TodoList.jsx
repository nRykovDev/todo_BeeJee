import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodoData } from '../../redux/slices/todos.slice';
import { getTodosThunk } from '../../redux/thunks/todoThunks';
import { Todo } from './Todo';
import { useState } from 'react';
import { Form } from './Form';
import getPages from './helperFuncs';
import {
  selectPageData,
  setError,
  setDirection,
  setSortBy,
} from '../../redux/slices/pageStates.slice';
import { selectUser, unsetUser } from '../../redux/slices/users.slice';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodoData);
  const [todosMapped, setTodosMapped] = useState([]);
  const [pagesMapped, setPagesMapped] = useState([]);
  const pageData = useSelector(selectPageData);
  const user = useSelector(selectUser);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.currentTarget.value));
  };

  const handlePageChange = (e) => {
    dispatch(
      getTodosThunk(
        e.currentTarget.value,
        pageData.sortBy || 'username',
        pageData.direction || 'desc'
      )
    );
  };

  const handleDirectionChange = () => {
    if (pageData.direction === 'desc') return dispatch(setDirection('asc'));
    dispatch(setDirection('desc'));
  };

  const handlePageArrow = (direction) => {
    if (direction === 'prev' && todos.page === 1) return;
    if (direction === 'prev') {
      return dispatch(
        getTodosThunk(
          todos.page - 1,
          pageData.sortBy || 'username',
          pageData.direction || 'desc'
        )
      );
    }

    if (todos.page == pagesMapped.length) return;
    dispatch(
      getTodosThunk(
        +todos.page + 1,
        pageData.sortBy || 'username',
        pageData.direction || 'desc'
      )
    );
  };

  const handleLogout = () => {
    fetch('https://bgtestserver.onrender.com/admin/logout', {}).then(() =>
      dispatch(unsetUser())
    );
  };

  useEffect(() => {
    if (pageData.error.length) {
      setTimeout(() => {
        dispatch(setError(''));
      }, 3000);
    }
  }, [pageData.error]);

  useEffect(() => {
    dispatch(
      getTodosThunk(
        todos.page || 1,
        pageData.sortBy || 'username',
        pageData.direction || 'desc'
      )
    );
  }, [pageData]);

  useEffect(() => {
    setTodosMapped(
      todos.selectedTodos.entries.map((todo) => (
        <Todo key={todo.id} task={todo}></Todo>
      ))
    );
    setPagesMapped(
      getPages(Math.ceil(todos.selectedTodos.entriesCount / 3) || 1)
    );
  }, [todos]);

  return (
    <>
      {user ? (
        <button
          onClick={handleLogout}
          className="authButton pageMenu pageSelect">
          logout
        </button>
      ) : (
        <a href="/admin">
          <button className="authButton pageMenu pageSelect">
            Login as admin
          </button>
        </a>
      )}
      <div className="container">
        <div className="sortContainer">
          <select
            onChange={handleSortChange}
            className="pageMenu pageSelect sortSelect"
            value={pageData.sortBy}>
            <option value="username">username</option>
            <option value="email">email</option>
            <option value="status">status</option>
          </select>
          <button
            onClick={handleDirectionChange}
            className="pageMenu pageSelect">
            {pageData.direction}
          </button>
        </div>
        {todosMapped}
        <Form
          page={todos.page}
          entriesCount={todos.selectedTodos.entriesCount}
          setPagesMapped={setPagesMapped}
        />
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
