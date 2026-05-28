require('dotenv').config({ quiet: true });
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

// Middleware to verify JWT token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// GET user profile
router.get('/profile', authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, display_name, bio, created_at')
    .eq('id', req.userId)
    .single();
  if (error) return res.status(404).json({ error: 'User not found' });
  res.json(data);
});

// UPDATE display name and bio
router.patch('/profile', authMiddleware, async (req, res) => {
  const { display_name, bio } = req.body;
  const { data, error } = await supabase
    .from('users')
    .update({ display_name, bio })
    .eq('id', req.userId)
    .select('id, username, email, display_name, bio');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// UPDATE username
router.patch('/username', authMiddleware, async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single();

  if (existing) return res.status(400).json({ error: 'Username already taken' });

  const { data, error } = await supabase
    .from('users')
    .update({ username })
    .eq('id', req.userId)
    .select('id, username, email');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// UPDATE email
router.patch('/email', authMiddleware, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const { data: user } = await supabase
    .from('users')
    .select('password')
    .eq('id', req.userId)
    .single();

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Wrong password' });

  const { data, error } = await supabase
    .from('users')
    .update({ email })
    .eq('id', req.userId)
    .select('id, username, email');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// UPDATE password
router.patch('/password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'All fields required' });

  const { data: user } = await supabase
    .from('users')
    .select('password')
    .eq('id', req.userId)
    .single();

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return res.status(400).json({ error: 'Current password is wrong' });

  const hashed = await bcrypt.hash(newPassword, 10);
  const { error } = await supabase
    .from('users')
    .update({ password: hashed })
    .eq('id', req.userId);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Password updated' });
});

// DELETE account
router.delete('/account', authMiddleware, async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  const { data: user } = await supabase
    .from('users')
    .select('password')
    .eq('id', req.userId)
    .single();

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Wrong password' });

  await supabase.from('comments').delete().eq('user_id', req.userId);
  await supabase.from('posts').delete().eq('user_id', req.userId);
  const { error } = await supabase.from('users').delete().eq('id', req.userId);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Account deleted' });
});

module.exports = router;
