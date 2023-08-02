import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/slices/users.slice';
import { selectPageData } from '../../redux/slices/pageStates.slice';
import { setError } from '../../redux/slices/pageStates.slice';

export const Auth = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageData = useSelector(selectPageData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://bgtestserver.onrender.com/admin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.authorized) {
          setTimeout(() => {
            dispatch(setError(''));
          }, 3000);
          return dispatch(setError('Wrong username or password'));
        }
        dispatch(setUser());
        navigate('/', { replace: true });
      });
  };

  return (
    <form className="authContainer" onSubmit={handleSubmit}>
      <h2 className="authHeader">Log in as admin</h2>
      <label htmlFor="username" className="authLabel">
        Username:
      </label>
      <input
        className="authInput"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
      />

      <br />
      <label htmlFor="password" className="authLabel">
        Password:
      </label>
      <input
        className="authInput"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <button className="submit submitAuth" type="submit">
        Log in
      </button>
      <h4 className="authError">{pageData.error}</h4>
    </form>
  );
};
