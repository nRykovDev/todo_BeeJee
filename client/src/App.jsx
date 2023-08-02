import { Route, Routes } from 'react-router-dom';
import { TodoList } from './components/TodoList/TodoList';
import { Auth } from './components/Auth/Auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unsetUser } from './redux/slices/users.slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://bgtestserver.onrender.com/admin/check')
      .then((response) => response.json())
      .then((result) => {
        if (!result.authorized) dispatch(unsetUser());
      });
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/admin" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
