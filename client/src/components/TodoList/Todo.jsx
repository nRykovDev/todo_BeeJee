import { useState } from 'react';

export const Todo = ({ task }) => {
  const [status, setStatus] = useState(task.status == 1 ? 'Done' : 'To Do');

  return (
    <>
      <div className="todoEntry">
        <div className="userInfo">
          <p className="userEmail">{task.email}</p> <br />
          <p className="username">{task.username}</p>
        </div>
        <h6 className="task">{task.task}</h6>
        <div className="status statusDone">
          <p>{status}</p>
        </div>
      </div>
    </>
  );
};
