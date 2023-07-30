import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodosThunk } from '../../redux/thunks/todoThunks';

export const Form = ({ page }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    task: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/todo/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      dispatch(getTodosThunk(page));
    });
  };

  return (
    <form className="todoEntry" onSubmit={handleSubmit}>
      <div className="userInfo formInfo">
        <input
          onChange={handleChange}
          className="userInput"
          name="email"
          type="email"
          placeholder="email"></input>
        <br />
        <input
          onChange={handleChange}
          className="userInput"
          name="username"
          type="text"
          placeholder="username"></input>
      </div>
      <textarea
        onChange={handleChange}
        className="taskInput"
        name="task"
        type="text"
        placeholder="task"></textarea>
      <button className="status submit" type="submit">
        Add
      </button>
    </form>
  );
};
