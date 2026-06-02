require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const forgotPasswordRouter = require('./routes/forgot-password');
const settingsRouter = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || '127.0.0.1';

// Security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, slow down!' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many auth attempts, try again later.' }
});

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(limiter);

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/auth', authLimiter, forgotPasswordRouter);
app.use('/api/settings', settingsRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});