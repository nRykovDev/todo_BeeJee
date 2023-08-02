import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosThunk } from '../../redux/thunks/todoThunks';
import { verifyInput } from './helperFuncs';
import getPages from './helperFuncs';
import { selectPageData, setError } from '../../redux/slices/pageStates.slice';

export const Form = ({ page, setPagesMapped, entriesCount }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    task: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyInput(formData, dispatch, setError) !== 'valid') return;
    fetch('https://bgtestserver.onrender.com/todo/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(() => {
        dispatch(getTodosThunk(page));
        setTimeout(() => {
          setSubmitStatus('');
        }, 3000);
        setSubmitStatus('Task Added');
      })
      .then(() => {
        setPagesMapped(getPages(Math.ceil(entriesCount / 3) || 1));
        setFormData({
          email: '',
          username: '',
          task: '',
        });
      });
  };

  return (
    <form className="todoEntry todoForm" onSubmit={handleSubmit}>
      <div className="userInfo formInfo">
        <input
          value={formData.email}
          onChange={handleChange}
          className="userInput"
          name="email"
          type="text"
          placeholder="email"></input>
        <br />
        <input
          value={formData.username}
          onChange={handleChange}
          className="userInput"
          name="username"
          type="text"
          placeholder="username"></input>
      </div>
      <textarea
        value={formData.task}
        onChange={handleChange}
        className="taskInput"
        name="task"
        type="text"
        placeholder="task"></textarea>
      <button className="status submit" type="submit">
        Add
      </button>
      <div className="submitStatus">
        {pageData.error.length ? pageData.error : submitStatus}
      </div>
    </form>
  );
};
