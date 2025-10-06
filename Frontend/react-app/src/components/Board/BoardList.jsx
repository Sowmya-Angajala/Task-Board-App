import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoards, createBoard } from '../../redux/slices/boardSlice';
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
const BoardList = () => {
  const dispatch = useDispatch();
  const { boards, loading } = useSelector((state) => state.board);
  const { user } = useSelector((state) => state.auth);
  const [boardName, setBoardName] = useState('');
  const [columns, setColumns] = useState('Todo,In Progress,Done');
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);
  const handleCreateBoard = () => {
    if (!boardName) return;
    const columnArray = columns.split(',').map((c) => c.trim());
    dispatch(createBoard({ name: boardName, description: '', columnNames: columnArray }));
    setBoardName('');
  };
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        {user && user.role === 'Admin' && (
          <div style={{ marginBottom: '20px' }}>
            <input placeholder="Board Name" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
            <input placeholder="Columns (comma separated)" value={columns} onChange={(e) => setColumns(e.target.value)} />
            <button onClick={handleCreateBoard}>Create Board</button>
          </div>
        )}
        <h3>Boards</h3>
        {loading ? <p>Loading...</p> : (
          <ul>
            {boards.map((b) => (
              <li key={b._id}><Link to={`/board/${b._id}`}>{b.name}</Link></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default BoardList;