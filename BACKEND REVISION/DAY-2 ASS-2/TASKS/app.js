const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());

function readTasks() {
  const data = fs.readFileSync(TASKS_FILE, 'utf8');
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}


app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.get('/tasks/filter', (req, res) => {
  const { tag } = req.query;
  const tasks = readTasks();
  if (!tag) return res.status(400).json({ error: 'Tag query parameter is required' });
  const filtered = tasks.filter(task => task.tag.toLowerCase() === tag.toLowerCase());
  res.json(filtered);
});

app.post('/tasks', (req, res) => {
  const { title, description, tag, priority, status } = req.body;

  if (!title || !description || !tag || !priority || !status) {
    return res.status(400).json({ error: 'All fields (title, description, tag, priority, status) are required' });
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
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
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid task ID' });

  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const updatedTask = { ...tasks[index], ...req.body, id };
  tasks[index] = updatedTask;
  writeTasks(tasks);

  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid task ID' });

  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  writeTasks(tasks);

  res.json({ message: 'Task deleted successfully' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Task Tracker API running on http://localhost:${PORT}`);
});
