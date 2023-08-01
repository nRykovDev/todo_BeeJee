import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodoData } from '../../redux/slices/todos.slice';
import { getTodosThunk } from '../../redux/thunks/todoThunks';
import { setDirection, setSortBy } from '../../redux/slices/pageStates.slice';
import { Todo } from './Todo';
import { useState } from 'react';
import { Form } from './Form';
import getPages from './helperFuncs';
import { selectPageData } from '../../redux/slices/pageStates.slice';
import { selectUser, unsetUser } from '../../redux/slices/users.slice';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodoData);
  const [todosMapped, setTodosMapped] = useState([]);
  const [pages, setPages] = useState([1]);
  const [pagesMapped, setPagesMapped] = useState([]);
  const pageData = useSelector(selectPageData);
  const [authBtn, setAuthBtn] = useState();
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
    if (direction === 'prev') {
      if (todos.page === 1) return;
      return dispatch(
        getTodosThunk(
          todos.page - 1,
          pageData.sortBy || 'username',
          pageData.direction || 'desc'
        )
      );
    }

    if (todos.page == pages[pages.length - 1]) return;
    dispatch(
      getTodosThunk(
        +todos.page + 1,
        pageData.sortBy || 'username',
        pageData.direction || 'desc'
      )
    );
  };

  const handleLogout = () => {
    fetch('http://localhost:3000/admin/logout', {
      credentials: 'include',
    }).then(() => dispatch(unsetUser()));
  };

  useEffect(() => {
    if (user)
      return setAuthBtn(
        <button
          onClick={handleLogout}
          className="authButton pageMenu pageSelect">
          logout
        </button>
      );
    setAuthBtn(
      <a href="/admin">
        <button className="authButton pageMenu pageSelect">
          Login as admin
        </button>
      </a>
    );
  }, [user]);

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
    setPages([
      ...getPages(Math.ceil(todos.selectedTodos.entriesCount / 3) || 1),
    ]);
  }, [todos]);

  useEffect(() => {
    setPagesMapped(
      pages.map((page) => (
        <option className="pageOption pageMenu" key={page} value={page}>
          {page}
        </option>
      ))
    );
  }, [pages]);

  return (
    <>
      {authBtn}
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
          setPages={setPages}
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
