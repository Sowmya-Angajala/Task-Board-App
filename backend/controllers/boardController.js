const Board = require('../models/Board');
const Task = require('../models/Task');
const User = require('../models/User');

// Create a new board (Admin only)
const createBoard = async (req, res) => {
  const { name, description, columnNames } = req.body; // columnNames: ["Todo","In Progress","Done"]
  try {
    const columns = columnNames.map(col => ({ name: col, tasks: [] }));
    const board = await Board.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id],
      columns
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete board (Admin only)
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    if (board.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the creator can delete this board' });
    }

    // Delete all tasks in board columns
    const taskIds = board.columns.flatMap(col => col.tasks);
    await Task.deleteMany({ _id: { $in: taskIds } });

    await board.remove();
    res.json({ message: 'Board deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a task to a column
const addTaskToColumn = async (req, res) => {
  const { boardId, columnName, title, description, assignedTo, dueDate, order } = req.body;

  try {
    const board = await Board.findById(boardId).populate('members');
    if (!board) return res.status(404).json({ message: 'Board not found' });

    // Validate assignedTo is a member
    if (!board.members.find(member => member._id.toString() === assignedTo)) {
      return res.status(400).json({ message: 'Assigned user is not a member of this board' });
    }

    const task = await Task.create({ title, description, assignedTo, dueDate, order });

    // Add task to the correct column
    const column = board.columns.find(col => col.name === columnName);
    if (!column) return res.status(404).json({ message: 'Column not found' });

    column.tasks.push(task._id);
    await board.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Move task between columns or reorder in same column
const moveTask = async (req, res) => {
  const { boardId, fromColumn, toColumn, taskId, newOrder } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    // Remove task from old column
    const fromCol = board.columns.find(col => col.name === fromColumn);
    if (!fromCol) return res.status(404).json({ message: 'Source column not found' });
    fromCol.tasks = fromCol.tasks.filter(tid => tid.toString() !== taskId);

    // Add task to new column at newOrder
    const toCol = board.columns.find(col => col.name === toColumn);
    if (!toCol) return res.status(404).json({ message: 'Destination column not found' });

    toCol.tasks.splice(newOrder, 0, taskId);

    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task details
const updateTaskDetails = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { boardId, taskId } = req.body;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    // Remove task from any column
    board.columns.forEach(col => {
      col.tasks = col.tasks.filter(tid => tid.toString() !== taskId);
    });
    await board.save();

    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBoard,
  deleteBoard,
  addTaskToColumn,
  moveTask,
  updateTaskDetails,
  deleteTask
};
