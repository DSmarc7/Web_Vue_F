const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); // Importing the Task model

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/mydatabase', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

// Middleware
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON request bodies

// Sample route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// GET all tasks for a user
app.get('/tasks/:user', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.user });
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// POST a new task for a user
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Additional endpoints can be added here for updating and deleting tasks

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
