const express = require('express');
const router = express.Router();
const {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    searchTodos
} = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', addTodo);
router.get('/search', searchTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
