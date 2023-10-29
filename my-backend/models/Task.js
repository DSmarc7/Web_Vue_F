
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Assuming user's email or ID from Microsoft authentication
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
