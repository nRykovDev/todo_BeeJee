import { Route, Routes } from 'react-router-dom';
import { TodoList } from './components/TodoList/TodoList';
import { Auth } from './components/Auth/Auth';

function App() {
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
