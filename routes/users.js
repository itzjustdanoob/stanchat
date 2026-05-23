const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// GET user by id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'User not found' });
  res.json(data);
});

// CREATE user
router.post('/', async (req, res) => {
  const { username, email } = req.body;
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

module.exports = router;
