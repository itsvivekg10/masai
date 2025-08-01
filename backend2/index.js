const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const TASKS_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());

function readTasks() {
    if (!fs.existsSync(TASKS_FILE)) return [];
    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
}

function writeTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

app.get('/tasks/filter', (req, res) => {
    const { tag } = req.query;
    if (!tag) return res.status(400).json({ error: "Tag query parameter required" });

    const tasks = readTasks();
    const filtered = tasks.filter(task => task.tag === tag);
    res.json(filtered);
});

app.post('/tasks', (req, res) => {
    const { title, description, tag, priority, status } = req.body;

    if (!title || !description || !tag || !priority || !status) {
        return res.status(400).json({ error: "All task fields are required" });
    }

    const tasks = readTasks();
    const newTask = {
        id: Date.now().toString(),
        title,
        description,
        tag,
        priority,
        status
    };
    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    let tasks = readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    tasks[index] = { ...tasks[index], ...updatedData };
    writeTasks(tasks);

    res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    let tasks = readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    const removed = tasks.splice(index, 1);
    writeTasks(tasks);

    res.json({ message: "Task deleted", task: removed[0] });
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
