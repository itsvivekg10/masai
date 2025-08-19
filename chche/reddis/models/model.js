// Fake in-memory DB
const users = [];
const books = new Map();
const nextBookId = new Map();
let nextUserId = 1;

function createUser(username, passwordHash) {
  const user = { id: nextUserId++, username, passwordHash };
  users.push(user);
  books.set(user.id, []);
  nextBookId.set(user.id, 1);
  return user;
}

function getUserByUsername(username) {
  return users.find((u) => u.username === username);
}

function getBooks(userId) {
  return books.get(userId) || [];
}

function setBooks(userId, arr) {
  books.set(userId, arr);
}

function nextId(userId) {
  const v = nextBookId.get(userId) || 1;
  nextBookId.set(userId, v + 1);
  return v;
}

module.exports = { users, createUser, getUserByUsername, getBooks, setBooks, nextId };
