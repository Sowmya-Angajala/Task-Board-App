import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/axiosConfig';
import Navbar from '../Layout/Navbar';
import Column from './Column';

const BoardDetails = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/boards/${id}`);
        const data = await res.json();
        setBoard(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoard();
  }, [id]);

  if (!board) {
    return <p>Loading...</p>;   // ✅ fixed
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>{board.title}</h1>
        <p>{board.description}</p>
      </div>
    </>
  );
};

export default BoardDetails;
