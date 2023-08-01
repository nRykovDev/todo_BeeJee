import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/slices/users.slice';

export const Auth = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/admin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.authorized) {
          setTimeout(() => {
            setError('');
          }, 3000);
          return setError('Wrong username or password');
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
      <h4 className="authError">{error}</h4>
    </form>
  );
};
