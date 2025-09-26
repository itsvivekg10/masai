// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('ioredis');
const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server);

// Config (use env vars in production)
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || null; // e.g., "redis://localhost:6379"
const MONGO_URL = process.env.MONGO_URL || null; // e.g., "mongodb://localhost:27017/chat"

// ===== In-memory state (core requirement) =====
let messages = []; // { username, text, timestamp, room, isAdmin }
const MAX_IN_MEMORY = 1000;

let onlineUsers = {}; // username -> socketId (last connected)
let registeredUsers = new Set(); // basic registration (could be persisted)

// ===== Optional Redis connection =====
let redis = null;
if (REDIS_URL) {
  redis = new Redis(REDIS_URL);
  redis.on('error', (err) => console.error('Redis error', err));
  console.log('Connected to Redis');
}

// ===== Optional Mongo connection (for backups) =====
if (MONGO_URL) {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Mongo connection error', err));
}

// Message schema for Mongo (optional)
const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  timestamp: Date,
  room: { type: String, default: 'global' },
  isAdmin: { type: Boolean, default: false }
});
const MessageModel = mongoose.models.Message || mongoose.model('Message', messageSchema);

// ===== Helper functions =====
function pushMessageStore(msg) {
  // push to in-memory
  messages.push(msg);
  if (messages.length > MAX_IN_MEMORY) messages.shift();

  // push to Redis list if available
  if (redis) {
    const key = `chat:global${msg.room ? ':' + msg.room : ''}`;
    // store JSON string, limit to last 1000
    redis.lpush(key, JSON.stringify(msg));
    redis.ltrim(key, 0, 999);
  }
}

// ===== REST endpoints =====
// Simple register endpoint (keeps a persistent registered user set in Redis if available)
app.post('/register', async (req, res) => {
  const { username, isAdmin } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });

  registeredUsers.add(username);
  // persist to redis set 'registered:users' if redis
  if (redis) await redis.sadd('registered:users', username);

  return res.json({ ok: true, username, isAdmin: !!isAdmin });
});

// get recent history (from Redis if possible, else from memory)
app.get('/history', async (req, res) => {
  const room = req.query.room || 'global';
  if (redis) {
    const key = `chat:global${room && room !== 'global' ? ':' + room : ''}`;
    const items = await redis.lrange(key, 0, 99); // latest 100
    const parsed = items.reverse().map(i => JSON.parse(i));
    return res.json({ ok: true, source: 'redis', messages: parsed });
  } else {
    const filtered = messages.filter(m => (room === 'global' ? true : m.room === room)).slice(-100);
    return res.json({ ok: true, source: 'memory', messages: filtered });
  }
});

// get online users
app.get('/online-users', (req, res) => {
  return res.json({ users: Object.keys(onlineUsers) });
});

// ===== Socket.IO events =====
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  // register event - the client must register immediately after connecting
  socket.on('register', async (payload) => {
    // payload: { username, isAdmin, room }
    const { username, isAdmin = false, room = 'global' } = payload || {};
    if (!username) {
      socket.emit('error', { message: 'username required to register' });
      return;
    }

    // Only allow if registered via REST or auto-register (choose policy)
    // Here: if registeredUsers is not empty, enforce it; otherwise accept.
    if (registeredUsers.size > 0 && !registeredUsers.has(username)) {
      // try redis check
      if (redis) {
        const isMember = await redis.sismember('registered:users', username);
        if (!isMember) {
          socket.emit('register_failed', { message: 'You must register first via /register' });
          return;
        }
      } else {
        socket.emit('register_failed', { message: 'You must register first via /register' });
        return;
      }
    }

    // mark online
    onlineUsers[username] = socket.id;
    socket.data.username = username;
    socket.data.isAdmin = !!isAdmin;
    socket.join(room);
    socket.data.room = room;

    // notify all users
    io.emit('online_users', Object.keys(onlineUsers));
    io.to(room).emit('user_joined', { username, room });

    // broadcast a system message
    const sysMsg = {
      username: 'System',
      text: `${username} joined ${room}`,
      timestamp: new Date(),
      room,
      isAdmin: false
    };
    pushMessageStore(sysMsg);
    io.to(room).emit('message', sysMsg);

    // send recent history for the room to this socket
    if (redis) {
      const key = `chat:global${room && room !== 'global' ? ':' + room : ''}`;
      const items = await redis.lrange(key, 0, 49);
      const parsed = items.reverse().map(i => JSON.parse(i));
      socket.emit('history', parsed);
    } else {
      const filtered = messages.filter(m => m.room === room).slice(-50);
      socket.emit('history', filtered);
    }
  });

  // message event for broadcasting a message to a room
  socket.on('send_message', (payload) => {
    // payload: { text, room }
    const username = socket.data.username;
    if (!username) return socket.emit('error', { message: 'register first' });
    const room = payload.room || socket.data.room || 'global';
    const msg = {
      username,
      text: payload.text,
      timestamp: new Date(),
      room,
      isAdmin: !!socket.data.isAdmin
    };
    pushMessageStore(msg);
    io.to(room).emit('message', msg);
  });

  // admin broadcast
  socket.on('admin_broadcast', (payload) => {
    const username = socket.data.username;
    if (!username || !socket.data.isAdmin) {
      return socket.emit('error', { message: 'not authorized' });
    }
    const msg = {
      username: username,
      text: payload.text,
      timestamp: new Date(),
      room: 'global',
      isAdmin: true
    };
    pushMessageStore(msg);
    io.emit('message', msg); // global broadcast
  });

  // create/join room
  socket.on('create_room', (roomName) => {
    socket.join(roomName);
    socket.data.room = roomName;
    socket.emit('room_created', roomName);
  });

  socket.on('join_room', async (roomName) => {
    socket.join(roomName);
    socket.data.room = roomName;
    // send room history
    if (redis) {
      const key = `chat:global:${roomName}`;
      const items = await redis.lrange(key, 0, 49);
      socket.emit('history', items.reverse().map(i => JSON.parse(i)));
    } else {
      socket.emit('history', messages.filter(m => m.room === roomName).slice(-50));
    }
    io.to(roomName).emit('message', {
      username: 'System',
      text: `${socket.data.username} joined ${roomName}`,
      timestamp: new Date(),
      room: roomName
    });
  });

  socket.on('manual_disconnect', () => {
    socket.disconnect(true);
  });

  socket.on('disconnect', (reason) => {
    const username = socket.data.username;
    if (username) {
      if (onlineUsers[username] === socket.id) delete onlineUsers[username];
      io.emit('online_users', Object.keys(onlineUsers));
      io.emit('user_left', { username, reason });
      pushMessageStore({
        username: 'System',
        text: `${username} left`,
        timestamp: new Date(),
        room: socket.data.room || 'global',
        isAdmin: false
      });
    }
    console.log('socket disconnected', socket.id, reason);
  });

});

if (redis && MONGO_URL) {
  cron.schedule('* * * * *', async () => {
    try {
      const key = 'chat:global';
      const items = await redis.lrange(key, 0, 999); // newest -> oldest
      const docs = items.reverse().map(i => JSON.parse(i)); // oldest -> newest
      if (docs.length === 0) return;

      await MessageModel.insertMany(docs, { ordered: false }).catch(err => {
       
      console.log(`Backed up ${docs.length} messages from Redis -> Mongo`);
    } catch (err) {
      console.error('Backup cron error', err);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
