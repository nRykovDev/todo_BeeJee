import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusThunk } from '../../redux/thunks/todoThunks';
import { selectUser } from '../../redux/slices/users.slice';
import { editTodo } from '../../redux/slices/todos.slice';
import { selectPageData, setError } from '../../redux/slices/pageStates.slice';

export const Todo = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState(task.task);
  const user = useSelector(selectUser);
  const pageData = useSelector(selectPageData);

  const status = task.status == 1 ? 'Done' : 'To Do';

  const handleClickStatus = () => {
    if (user) return dispatch(updateStatusThunk(task));
    return;
  };

  useEffect(() => {
    if (pageData.error === 'Please authorize') {
      setTimeout(() => {
        dispatch(setError(''));
      }, 3000);
    }
  }, [pageData.error]);

  const handleChangeEdit = (e) => {
    if (!user) return;
    setTaskInput(e.currentTarget.value);
  };

  const handleSubmitEdit = async () => {
    if (editing) {
      if (taskInput.length > 80) return setError('Task name is too long');
      return fetch('http://localhost:3000/todo/edited', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: task.id, newText: taskInput }),
      }).then((res) => {
        if (res.status === 403) return dispatch(setError('Please authorize'));
        dispatch(editTodo({ ...task, task: taskInput, edited: true }));
        setEditing(false);
      });
    }
    setEditing(true);
  };

  return (
    <>
      <div className="todoEntry">
        {task.edited ? <p className="edited">Edited By Admin</p> : ''}
        {user ? (
          <button onClick={handleSubmitEdit} className="editBtn">
            {editing ? 'Save' : 'Edit'}
          </button>
        ) : (
          ''
        )}
        <div className="userInfo">
          <p className="userEmail">{task.email}</p> <br />
          <p className="username">{task.username}</p>
        </div>
        {editing ? (
          <input
            className="task"
            onChange={handleChangeEdit}
            value={taskInput}
          />
        ) : (
          <h6 className="task">{task.task}</h6>
        )}
        <button onClick={handleClickStatus} className="status statusTodo">
          {status}
        </button>
      </div>
    </>
  );
};
