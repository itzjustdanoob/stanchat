const express = require('express');
const cors = require('cors');

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'StanChat backend is alive! ' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});