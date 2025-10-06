const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  name: { type: String, required: true },          // e.g., "Todo", "In Progress", "Done"
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  columns: [columnSchema],                        // Added columns
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
