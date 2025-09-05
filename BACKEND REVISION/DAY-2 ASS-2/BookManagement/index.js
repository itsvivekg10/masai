const express = require('express');
const app = express();
const path = require('path');

const adminRoutes = require('./routes/adminRoutes');
const readerRoutes = require('./routes/readerRoutes');

const loggerMiddleware = require('./middleware/loggerMiddleware');

app.use(express.json());

app.use(loggerMiddleware);

app.use('/admin', adminRoutes);
app.use('/reader', readerRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Book Management API running on port ${PORT}`);
});
