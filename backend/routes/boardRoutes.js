const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createBoard,
  deleteBoard,
  addTaskToColumn,
  moveTask,
  updateTaskDetails,
  deleteTask
} = require('../controllers/boardController');

const router = express.Router();

// Board management
router.post('/', protect, admin, createBoard);
router.delete('/:boardId', protect, deleteBoard);

// Task management
router.post('/task', protect, addTaskToColumn);
router.put('/task/move', protect, moveTask);
router.put('/task/:taskId', protect, updateTaskDetails);
router.delete('/task', protect, deleteTask);

module.exports = router;
