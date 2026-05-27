require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const path = require('path');

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const forgotPasswordRouter = require('./routes/forgot-password');

const app = express();
const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/auth', forgotPasswordRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
