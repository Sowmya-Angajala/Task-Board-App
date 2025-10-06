const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dueDate: { type: Date },
  order: { type: Number, default: 0 }, // order within column for drag-and-drop
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
