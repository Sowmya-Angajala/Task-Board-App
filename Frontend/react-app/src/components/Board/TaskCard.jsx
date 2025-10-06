import React, { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';
const TaskCard = ({ taskId, boardId, refreshBoard }) => {
  const [task, setTask] = useState(null);
  const fetchTask = async () => {
    const res = await API.get(`/tasks/${taskId}`);
    setTask(res.data);
  };
  const handleDelete = async () => {
    await API.delete('/boards/task', { data: { boardId, taskId } });
    refreshBoard();
  };
  useEffect(() => {
    fetchTask();
  }, [taskId]);
  if (!task) return null;
  return (
    <div style={{ background: '#fff', padding: '8px', margin: '5px 0', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <button onClick={handleDelete} style={{ fontSize: '12px', color: 'red' }}>Delete</button>
    </div>
  );
};
export default TaskCard;