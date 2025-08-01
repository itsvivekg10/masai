const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

const readTodos = () => {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
};

const writeTodos = (todos) => {
    fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2), 'utf8');
};

module.exports = { readTodos, writeTodos };
