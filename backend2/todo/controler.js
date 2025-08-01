const { readTodos, writeTodos } = require('../models/todoModel');

let nextId = 1;

const getTodos = (req, res) => {
    const todos = readTodos();
    res.json(todos);
};

const addTodo = (req, res) => {
    const { title, completed = false } = req.body;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    const todos = readTodos();
    const newTodo = { id: nextId++, title, completed };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todos = readTodos();
    const todo = todos.find(t => t.id === parseInt(id));

    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    writeTodos(todos);
    res.json(todo);
};

const deleteTodo = (req, res) => {
    const { id } = req.params;
    let todos = readTodos();
    const index = todos.findIndex(t => t.id === parseInt(id));

    if (index === -1) return res.status(404).json({ error: 'Todo not found' });

    const deleted = todos.splice(index, 1);
    writeTodos(todos);
    res.json({ message: 'Todo deleted', deleted });
};

const searchTodos = (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

    const todos = readTodos();
    const filtered = todos.filter(todo =>
        todo.title.toLowerCase().includes(q.toLowerCase())
    );

    res.json(filtered);
};

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    searchTodos,
};
