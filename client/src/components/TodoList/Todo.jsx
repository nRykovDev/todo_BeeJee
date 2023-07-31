import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusThunk } from '../../redux/thunks/todoThunks';
import { selectUser } from '../../redux/slices/users.slice';

export const Todo = ({ task }) => {
  const status = task.status == 1 ? 'Done' : 'To Do';
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleClick = () => {
    if (user) return dispatch(updateStatusThunk(task));
    return;
  };

  return (
    <>
      <div className="todoEntry">
        <div className="userInfo">
          <p className="userEmail">{task.email}</p> <br />
          <p className="username">{task.username}</p>
        </div>
        <h6 className="task">{task.task}</h6>
        <div onClick={handleClick} className="status statusTodo">
          <p>{status}</p>
        </div>
      </div>
    </>
  );
};
