const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const postVotes = new Map();

function getVoteKey(postId, userId) {
  return `${postId}:${userId}`;
}

async function voteOnPost(req, res, delta) {
  const { user_id } = req.body;
  const postId = req.params.id;

  if (!user_id) return res.status(400).json({ error: 'user_id required' });

  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select('votes')
    .eq('id', postId)
    .single();

  if (fetchError) return res.status(404).json({ error: 'Post not found' });

  const voteKey = getVoteKey(postId, user_id);
  if (postVotes.has(voteKey)) {
    return res.status(409).json({ error: 'You already voted on this post' });
  }

  const { data, error } = await supabase
    .from('posts')
    .update({ votes: Number(post.votes || 0) + delta })
    .eq('id', postId)
    .select();

  if (error) return res.status(500).json({ error: error.message });

  postVotes.set(voteKey, delta > 0 ? 'up' : 'down');
  res.json(data[0]);
}

// GET all posts
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET single post
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Post not found' });
  res.json(data);
});

// CREATE post
router.post('/', async (req, res) => {
  const { title, content, flair, user_id } = req.body;
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, flair, user_id }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// UPVOTE post
router.post('/:id/vote', async (req, res) => {
  await voteOnPost(req, res, 1);
});

// DOWNVOTE post
router.post('/:id/downvote', async (req, res) => {
  await voteOnPost(req, res, -1);
});

// GET comments for a post
router.get('/:id/comments', async (req, res) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', req.params.id)
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ADD comment to a post
router.post('/:id/comments', async (req, res) => {
  const { content, user_id } = req.body;

  if (!content || !user_id)
    return res.status(400).json({ error: 'content and user_id required' });

  const { data, error } = await supabase
    .from('comments')
    .insert([{ content, user_id, post_id: req.params.id }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

module.exports = router;
