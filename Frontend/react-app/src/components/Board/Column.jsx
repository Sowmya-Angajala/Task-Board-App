import React, { useState } from 'react';
import API from '../../api/axiosConfig';
import TaskCard from './TaskCard';
const Column = ({ column, boardId, refreshBoard }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const handleAddTask = async () => {
    if (!taskTitle) return;
    await API.post('/boards/task', {
      boardId,
      columnName: column.name,
      title: taskTitle,
      description: '',
    });
    setTaskTitle('');
    refreshBoard();
  };
  return (
    <div style={{ width: '250px', background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
      <h4>{column.name}</h4>
      {column.tasks.map((taskId) => (
        <TaskCard key={taskId} taskId={taskId} boardId={boardId} refreshBoard={refreshBoard} />
      ))}
      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="New Task"
        style={{ width: '100%', padding: '5px', marginTop: '10px' }}
      />
      <button onClick={handleAddTask} style={{ width: '100%', marginTop: '5px' }}>Add Task</button>
    </div>
  );
};
export default Column;